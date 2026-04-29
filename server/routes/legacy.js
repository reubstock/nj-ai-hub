const router = require('express').Router();
const store = require('../store');

router.get('/', (req, res) => res.json(store.legacy.all()));
router.get('/:id', (req, res) => {
  const item = store.legacy.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});
router.post('/', (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  res.status(201).json(store.legacy.insert(req.body));
});
router.put('/:id', (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title is required' });
  const updated = store.legacy.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

module.exports = router;
