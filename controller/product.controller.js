const productService = require('.././service/product.service');
const daoCategory = require('.././dao/category.dao');

let controller = {}

controller.addProducts = addProducts;

module.exports = controller;

function addProduct(product, callback){
    productService.addProduct(product)
    .then((result) => {
        console.log("Success" + result)
        callback(result);
    })
    .catch((err) => {
        console.log("Fail", err)
        callback(err)
    })
}

function addProducts(req, res, next){
    for(let i = 0; i < req.body.length; i++){
        var product = req.body[i];
        console.log(req.body[i]);
        daoCategory.getCategoryByName(req.body[i].category)
        .then((response) => {
            product.category = response._id;
            
            console.log(response)

            addProduct(product, (result) => {
                if(i = req.body.length){
                    res.json(result)
                }
            });
        })
        .catch((err) => {
            product.category = "SEM CATEGORIA";
        });
    }
}