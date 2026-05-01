'use strict';
// Async data store for NJ AI Hub.
// Uses Vercel KV (Redis) when KV_REST_API_URL + KV_REST_API_TOKEN are present.
// Falls back to the in-memory store when running locally without KV env vars.

const hasKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
let kv;

if (hasKV) {
  kv = require('@vercel/kv').kv;
}

// In-memory fallback (local dev / no KV configured)
const mem = require('./store');

// ── KV key names ─────────────────────────────────────────────────────────────
const SEEDED_KEY  = 'nj:seeded';
const cntKey  = (ns) => `nj:id:${ns}`;
const listKey = (ns) => `nj:${ns}`;

// ── KV helpers ────────────────────────────────────────────────────────────────
async function getList(ns) {
  const data = await kv.get(listKey(ns));
  return Array.isArray(data) ? data : [];
}

async function setList(ns, arr) {
  await kv.set(listKey(ns), arr);
}

async function nextId(ns) {
  return kv.incr(cntKey(ns));   // atomic increment — safe under concurrent requests
}

const maxId = (arr) => arr.reduce((m, x) => Math.max(m, x.id || 0), 0);

const today = () => new Date().toISOString().split('T')[0];

const sortByDateDesc = (arr) => [...arr].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const sortByDateAsc  = (arr) => [...arr].sort((a, b) => (a.date || '').localeCompare(b.date || ''));

// ── Seed (runs once on first cold-start that has KV credentials) ──────────────
async function seedIfNeeded() {
  if (!hasKV) return;  // no KV — nothing to seed

  const already = await kv.get(SEEDED_KEY);
  if (already) return;

  const news     = mem.news.all();
  const events   = mem.events.all();
  const team     = mem.team.all();
  const partners = mem.partners.all();
  const legacy   = mem.legacy.all();

  await Promise.all([
    setList('news',     news),
    setList('events',   events),
    setList('team',     team),
    setList('partners', partners),
    setList('legacy',   legacy),
    setList('contacts', []),
    kv.set(cntKey('news'),     maxId(news)),
    kv.set(cntKey('events'),   maxId(events)),
    kv.set(cntKey('team'),     maxId(team)),
    kv.set(cntKey('partners'), maxId(partners)),
    kv.set(cntKey('legacy'),   maxId(legacy)),
    kv.set(cntKey('contacts'), 0),
    kv.set(SEEDED_KEY, '1'),
  ]);
  console.log('[kv-store] Seeded Vercel KV with initial data.');
}

// ── Photo size guard (base64 images can be large; KV has a 1 MB value cap) ───
const MAX_PHOTO_BYTES = 400_000;  // ~400 KB — safe margin under KV limit
function checkPhotoSize(photo) {
  if (photo && photo.startsWith('data:') && photo.length > MAX_PHOTO_BYTES) {
    throw Object.assign(new Error('Photo too large — please use an image under ~300 KB.'), { status: 400 });
  }
}

// ── Public async API ──────────────────────────────────────────────────────────

module.exports = {
  seedIfNeeded,

  news: {
    all: async () => {
      if (!hasKV) return mem.news.all();
      return sortByDateDesc(await getList('news'));
    },
    get: async (id) => {
      if (!hasKV) return mem.news.get(id);
      const list = await getList('news');
      return list.find((n) => n.id === Number(id)) || null;
    },
    insert: async (data) => {
      if (!hasKV) return mem.news.insert(data);
      const list = await getList('news');
      const item = { ...data, id: await nextId('news'), date: data.date || today() };
      await setList('news', [...list, item]);
      return item;
    },
  },

  events: {
    all: async () => {
      if (!hasKV) return mem.events.all();
      return sortByDateAsc(await getList('events'));
    },
    upcoming: async () => {
      if (!hasKV) return mem.events.upcoming();
      const t = today();
      return sortByDateAsc(await getList('events')).filter((e) => (e.date || '') >= t);
    },
    get: async (id) => {
      if (!hasKV) return mem.events.get(id);
      const list = await getList('events');
      return list.find((e) => e.id === Number(id)) || null;
    },
    insert: async (data) => {
      if (!hasKV) return mem.events.insert(data);
      const list = await getList('events');
      const item = { ...data, id: await nextId('events') };
      await setList('events', [...list, item]);
      return item;
    },
  },

  team: {
    all: async () => {
      if (!hasKV) return mem.team.all();
      return getList('team');
    },
    get: async (id) => {
      if (!hasKV) return mem.team.get(id);
      const list = await getList('team');
      return list.find((m) => m.id === Number(id)) || null;
    },
  },

  partners: {
    all: async () => {
      if (!hasKV) return mem.partners.all();
      return getList('partners');
    },
  },

  legacy: {
    all: async () => {
      if (!hasKV) return mem.legacy.all();
      return sortByDateAsc(await getList('legacy'));
    },
    get: async (id) => {
      if (!hasKV) return mem.legacy.get(id);
      const list = await getList('legacy');
      return list.find((l) => l.id === Number(id)) || null;
    },
    insert: async (data) => {
      checkPhotoSize(data.photo);
      if (!hasKV) return mem.legacy.insert(data);
      const list = await getList('legacy');
      const item = { ...data, id: await nextId('legacy'), date: data.date || today() };
      await setList('legacy', [...list, item]);
      return item;
    },
    update: async (id, data) => {
      checkPhotoSize(data.photo);
      if (!hasKV) return mem.legacy.update(id, data);
      const list = await getList('legacy');
      const idx = list.findIndex((l) => l.id === Number(id));
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data, id: list[idx].id };
      await setList('legacy', list);
      return list[idx];
    },
    remove: async (id) => {
      if (!hasKV) return mem.legacy.remove(id);
      const list = await getList('legacy');
      const idx = list.findIndex((l) => l.id === Number(id));
      if (idx === -1) return null;
      const [removed] = list.splice(idx, 1);
      await setList('legacy', list);
      return removed;
    },
  },

  contacts: {
    all: async () => {
      if (!hasKV) return mem.contacts.all();
      return getList('contacts');
    },
    insert: async (data) => {
      if (!hasKV) return mem.contacts.insert(data);
      const list = await getList('contacts');
      const item = { ...data, id: await nextId('contacts'), created_at: new Date().toISOString() };
      await setList('contacts', [...list, item]);
      return item;
    },
  },
};
