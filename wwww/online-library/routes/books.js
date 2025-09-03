const router = require('express').Router();
const book = require('../controllers/bookController');

router.get('/', book.list);
router.post('/', book.create);

module.exports = router;
