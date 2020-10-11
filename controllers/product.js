const Product = require('../models/product.js');

exports.getAddProd = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product', 
        path: 'addProduct'
    });
};

exports.postAddProduct = (req, res, next) => { 
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/shop', {prods: products, docTitle: 'Shop', path: 'shop'});
    });
};