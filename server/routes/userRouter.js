const express = require('express');
const UserCtrl = require('../controllers/userController');
const router = express.Router();

router.post('/register', UserCtrl.registerUser);
router.get('/login', UserCtrl.loginUser);


module.exports = router;