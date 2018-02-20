const productService = require('.././service/product.service');
const daoCategory = require('.././dao/category.dao');

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
    for(let i = 0; i < req.body.length; i++){
        daoCategory.getCategoryByName(req.body[i].category)
        .then((response) => {
            req.body[i].category = response._id;

            console.log(req.body[i])

            addProduct(req.body[i], (result) => {
                if(i = req.body.length){
                    res.json(result)
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

function getProducts(req, res, next){
    productService.getProducts(req.body)
    .then((products) => {
        res.json(products);
    })
    .catch((err) => {
        res.json(err);
    })
}