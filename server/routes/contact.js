const router = require('express').Router();
const store  = require('../kv-store');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const saved = await store.contacts.insert({
      name, email, message,
      organization: req.body.organization || null,
    });
    console.log('[contact]', saved);
    res.status(201).json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
