const router = require('express').Router();
const store  = require('../kv-store');

router.get('/', async (req, res) => {
  try { res.json(await store.partners.all()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
