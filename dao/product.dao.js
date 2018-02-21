const Product = require('../schema/product.schema');
const Promise = require('promise');

let dao = {};

dao.addProduct = addProduct;
dao.getProducts = getProducts;

module.exports = dao;

function addProduct(product){
    return new Promise((resolve, reject) => {
        Product.create(product)
        .then((response) => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getProducts(filter){
    return new Promise((resolve, reject) => {
        Product.find(getProductQuery(filter))
        .then((products) => {
            resolve(products)
        })
        .catch((err) => {
            console.log("erro mongo")
            reject(err);
        })
    })
}

function getProductQuery(filter){
    return  {
        "name": filter.name ?  { "$regex": filter.name, "$options": "i" }: { $ne : filter.name},
        "category": filter.categories ? {$in : filter.categories} : {$ne: filter.categories},
        "unity": filter.unity ? filter.unity : {$ne: filter.unity}
    }
}