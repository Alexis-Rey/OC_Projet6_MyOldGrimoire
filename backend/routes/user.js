const express = require('express');
const router = express.Router();
const {apiLimiter} = require('../middleware/rateLimit');

const userCtrl = require('../controllers/user');

router.post('/signUp',apiLimiter, userCtrl.signUp);
router.post('/login',apiLimiter, userCtrl.login);

module.exports = router;