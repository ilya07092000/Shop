const path = require('path');

const express = require('express');

const router = express.Router();

const adminCotroller = require('../controllers/admin.js');

// /admin/add-product => GET
router.get('/add-product', adminCotroller.getAddProd);

// /admin/products => GET
router.get('/products', adminCotroller.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminCotroller.postAddProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;