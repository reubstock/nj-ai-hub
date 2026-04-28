const router = require('express').Router();
const store = require('../store');

router.get('/', (req, res) => res.json(store.partners.all()));

module.exports = router;
