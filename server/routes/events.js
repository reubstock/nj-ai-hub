const router = require('express').Router();
const store = require('../store');

router.get('/', (req, res) => {
  if (req.query.upcoming === 'true') return res.json(store.events.upcoming());
  res.json(store.events.all());
});
router.get('/:id', (req, res) => {
  const item = store.events.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});
router.post('/', (req, res) => {
  const { title, date } = req.body || {};
  if (!title || !date) return res.status(400).json({ error: 'title and date are required' });
  res.status(201).json(store.events.insert(req.body));
});

module.exports = router;
