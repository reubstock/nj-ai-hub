const router = require('express').Router();
const https  = require('https');

function fetchRSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NJ-AI-Hub/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRSS(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseItems(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];
    const get = tag => {
      const r = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
      const hit = r.exec(block);
      return hit ? hit[1].trim() : '';
    };
    const linkMatch = /<link>([^<]+)<\/link>/i.exec(block) ||
                      /<link[^>]+href="([^"]+)"/i.exec(block);
    const rawDesc = get('description');
    const plainDesc = rawDesc.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const imgMatch  = /<img[^>]+src="([^"]+)"/.exec(rawDesc);
    const encMatch  = /<enclosure[^>]+url="([^"]+)"/.exec(block);
    items.push({
      title:    get('title'),
      link:     linkMatch ? linkMatch[1].trim() : '',
      pubDate:  get('pubDate'),
      excerpt:  plainDesc.slice(0, 300) + (plainDesc.length > 300 ? '…' : ''),
      image:    imgMatch  ? imgMatch[1]   : null,
      audio:    encMatch  ? encMatch[1]   : null,
    });
  }
  return items;
}

router.get('/', async (req, res) => {
  try {
    const xml   = await fetchRSS('https://njaihubcast.substack.com/feed');
    const items = parseItems(xml);
    res.json(items);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

module.exports = router;
