const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { handleMask, handleRedirect } = require('../controllers/maskController');

router.use(cookieParser());

router.post('/maskUrl', handleMask);
router.post("/redirect/:id", handleRedirect);

module.exports = router;