const productService = require('.././service/product.service');

let controller = {}

controller.addProducts = addProducts;
controller.getProducts = getProducts;

module.exports = controller;

function addProduct(product, callback){
    productService.addProduct(product)
    .then((result) => {
        callback(result);
    })
    .catch((err) => {
        callback(err)
    })
}

function addProducts(req, res, next){
    productService.addProducts(req.body)
    .then((result) => {
        res.json(req.body.length + " produtos inseridos")
    })
    .catch((err) => {
        res.json(err)
    });
}

function getProducts(req, res, next){
    console.log("chamou o getProducts: " + req.body)
    productService.getProducts(req.body)
    .then((products) => {
        res.json(products);
    })
    .catch((err) => {
        res.json(err);
    })
}