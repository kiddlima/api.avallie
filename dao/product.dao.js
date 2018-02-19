const Product = require('../schema/product.schema');
const Promise = require('promise');

let dao = {};

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