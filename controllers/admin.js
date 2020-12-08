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
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
    .then(result => {
        console.log('Created');
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
};

exports.getEditProd = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    };
    const prodId = req.params.productId;    
    req.user.getProducts({where: {id: prodId}})
    .then(products => {
        let product = products[0];
        if(!product) {
            res.redirect('/')
        }
        res.render('admin/edit-product', {
            docTitle: 'Edit Product', 
            editing: editMode,
            product: product
        });
    })
    .catch(err => {
        console.log(err)
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED')
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render(
                'admin/products', {
                    prods: products, 
                    docTitle: 'Admin products', 
                    path: 'adminProds'
                }
            )
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;  
    Product.destroy({where: {id: prodId}})
    .then(result => {
        console.log('DESTROYED');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err)
    })
};