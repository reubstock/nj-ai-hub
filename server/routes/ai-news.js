const router = require('express').Router();

const FEED_URL = 'https://news.google.com/rss/topics/CAAqIAgKIhpDQkFTRFFvSEwyMHZNRzFyZWhJQ1pXNG9BQVAB?ceid=US:en&hl=en-US&gl=US';

// Simple RSS XML field extractor
function extractTag(xml, tag) {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, 'i');
  const plainRe  = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = xml.match(cdataRe) || xml.match(plainRe);
  return m ? m[1].trim() : '';
}

function extractAttr(xml, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, 'i');
  const m  = xml.match(re);
  return m ? m[1].trim() : '';
}

function parseRSS(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRe.exec(xml)) !== null) {
    const block = match[1];
    items.push({
      title:   extractTag(block, 'title'),
      link:    extractTag(block, 'link'),
      pubDate: extractTag(block, 'pubDate'),
      source:  extractTag(block, 'source'),
      description: extractTag(block, 'description')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim()
        .slice(0, 200),
    });
  }
  return items;
}

router.get('/', async (req, res) => {
  try {
    const response = await fetch(FEED_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NJAIHub/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      redirect: 'follow',
    });
    if (!response.ok) throw new Error(`Feed returned ${response.status}`);
    const xml   = await response.text();
    const items = parseRSS(xml).slice(0, 10);
    res.setHeader('Cache-Control', 'public, max-age=300'); // cache 5 min
    res.json(items);
  } catch (err) {
    console.error('ai-news fetch error:', err.message);
    res.status(502).json({ error: 'Could not fetch feed', detail: err.message });
  }
});

module.exports = router;
