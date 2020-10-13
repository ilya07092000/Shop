const Product = require('../models/product.js');
const Cart = require('../models//cart.js');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/shop', {prods: products, docTitle: 'Shop', path: 'products'});
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {product: product, docTitle: product.title})
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {prods: products, docTitle: 'Shop', path: 'shop'});
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {docTitle: 'Cart', path: 'cart'})
};
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {docTitle: 'Orders', path: 'orders'})
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {docTitle: 'Checkout', path: checkout})
};