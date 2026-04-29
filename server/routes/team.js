const router = require('express').Router();
const store  = require('../kv-store');

router.get('/', async (req, res) => {
  try { res.json(await store.team.all()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await store.team.get(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
