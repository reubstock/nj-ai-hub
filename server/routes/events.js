const router = require('express').Router();
const store  = require('../kv-store');

router.get('/', async (req, res) => {
  try {
    if (req.query.upcoming === 'true') return res.json(await store.events.upcoming());
    res.json(await store.events.all());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await store.events.get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { title, date } = req.body || {};
    if (!title || !date) return res.status(400).json({ error: 'title and date are required' });
    res.status(201).json(await store.events.insert(req.body));
  } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
});

module.exports = router;
