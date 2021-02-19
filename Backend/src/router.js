const express = require('express');
const {findUrl,insertUrl} = require('./controllers/url_controller');

const router = express.Router();

router.post('/',insertUrl);
router.get('/:parameter',findUrl);


module.exports = router
