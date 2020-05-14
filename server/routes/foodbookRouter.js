const express = require('express');
const FoodBookCtrl = require('../controllers/foodbookController');
const router = express.Router();

router.post('/foodbook', FoodBookCtrl.createCatalogue);
router.get('/foodbook/allrecipes', FoodBookCtrl.loadCatalogue);

module.exports = router;