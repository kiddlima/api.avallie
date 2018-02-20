const Product = require('../schema/product.schema');
const Promise = require('promise');
const dao = require('../dao/product.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addProduct = addProduct;

module.exports = service;

function addProduct(product){
    return new Promise((resolve, reject) => {
        dao.addProduct(product)
        .then(() => {
            resolve(appHelper.buildResponseMessage(200, "Produto cadastrado com sucesso"))
        })
        .catch((err) => {
            let error = err.errors;
            reject(appHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
        })
    });
}