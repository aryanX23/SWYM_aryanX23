const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { handleMask, handleRedirect } = require('../controllers/maskController');

router.use(cookieParser());

router.post('/maskUrl', handleMask);
router.get("/redirect/:id", handleRedirect);

module.exports = router;