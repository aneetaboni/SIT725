// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.send('BookHive home'); // keep simple for now (no res.render needed)
});

module.exports = router;
