const router = require('express').Router();
const store = require('../store');

router.get('/', (req, res) => res.json(store.team.all()));
router.get('/:id', (req, res) => {
  const item = store.team.get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

module.exports = router;
