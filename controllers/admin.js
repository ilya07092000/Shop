const Product = require('../models/product.js');

exports.getAddProd = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product', 
        path: 'addProduct'
    });
};

exports.postAddProduct = (req, res, next) => { 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, docTitle: 'Admin products', path: 'adminProds'});
    });
};