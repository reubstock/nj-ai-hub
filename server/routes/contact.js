const router = require('express').Router();
const store = require('../store');

router.post('/', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required' });
  }
  const saved = store.contacts.insert({ name, email, message, organization: req.body.organization || null });
  console.log('[contact]', saved);
  res.status(201).json({ ok: true });
});

module.exports = router;
