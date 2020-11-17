const Product = require('../models/product.js');

exports.getAddProd = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', 
        path: 'addProduct'
    });
};

exports.postAddProduct = (req, res, next) => { 
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description); 
    // null needs for product model in save method to create new product
    product.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getEditProd = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    };
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            docTitle: 'Edit Product', 
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const updatedProduct = new Product(prodId, title, imageUrl, price, description);
    updatedProduct.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {prods: products, docTitle: 'Admin products', path: 'adminProds'});
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};