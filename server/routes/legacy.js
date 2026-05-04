const router  = require('express').Router();
const store   = require('../kv-store');
const memStore = require('../store');

// Expose category constants so the admin UI can build its dropdown.
// (kv-store re-exports these from store.js when running in mem-only mode;
//  always import directly to avoid an extra await.)
router.get('/categories', (req, res) => res.json(memStore.CATEGORIES));

router.get('/', async (req, res) => {
  try { res.json(await store.legacy.all()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await store.legacy.get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title is required' });
    res.status(201).json(await store.legacy.insert(req.body));
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title is required' });
    const updated = await store.legacy.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await store.legacy.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
