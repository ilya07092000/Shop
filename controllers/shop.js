const Product = require('../models/product.js');
const User = require('../models/user.js');
// const Cart = require('../models/cart.js');
// const Order = require('../models/order.js');

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/shop', {
            prods: products,
            docTitle: 'Shop', 
            path: 'products'
        });
    })
    .catch(err => console.log(err))
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then((product) => {
        res.render('shop/product-detail', {
            product: product, 
            docTitle: product.title
        })
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Shop', 
            path: 'shop'
        });
    })
    .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
       return cart.getProducts();
    })
    .then(products => {
        res.render('shop/cart', {
            docTitle: 'Cart', 
            path: 'cart',
            products: products
        });
    })
    .catch(err => {
        console.log(err)
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        let newQty = 1;
        if(product) {
            let oldQuantity = product.cartItem.quantity;
            newQty = oldQuantity + 1;
            return fetchedCart.addProduct(product, {
                through: { quantity: newQty }
            })
        }
        return Product.findByPk(prodId)
            .then(product => {
                return fetchedCart.addProduct(product, { through: { quantity: newQty } });
            })
            .catch(err => {
                console.log(err)
            });
    })
    .then(() => {
        res.redirect('/cart')
    })
   .catch(err => {
       console.log(err)
   })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
        let product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    let prods;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        prods = products;
        return req.user.createOrder();
    })
    .then(order => {
        return order.addProducts(prods.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
        }));
    })
    .then(result => {
        fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err))  
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        console.log(orders)
        res.render('shop/orders', {
            docTitle: 'Orders', 
            path: 'orders',
            orders: orders,
        });
    })
    .catch(err => console.log(err))
};
