const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin.js');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProd);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProd);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;