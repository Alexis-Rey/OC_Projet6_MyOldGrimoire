const express = require('express');
const router = express.Router();
const {authLimiter} = require('../middleware/rateLimit');

const userCtrl = require('../controllers/user');

router.post('/signUp',authLimiter, userCtrl.signUp);
router.post('/login',authLimiter, userCtrl.login);

module.exports = router;