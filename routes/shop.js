const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/product.js');

router.get('/', productsController.getProducts);

module.exports = router;