const path = require('path');

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/product.js');

router.get('/add-product', productsController.getAddProd);

router.post('/add-product', productsController.postAddProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;