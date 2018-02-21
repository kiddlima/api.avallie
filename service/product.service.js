const Product = require('../schema/product.schema');
const Promise = require('promise');
const dao = require('../dao/product.dao');
const daoCategory = require('../dao/category.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addProduct = addProduct;
service.getProducts = getProducts;

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

function getProducts(filter){
    return new Promise((resolve, reject) => {
        dao.getProducts(filter)
        .then((products) => {
            if(products && products.length > 0){

                let allCategories = [];

                daoCategory.getAllCategories()
                .then((categories) => {
                    allCategories = categories;
                    for(let i = 0; i < products.length; i++){
                        products[i].category = appHelper.getCategoryFromId(products[i].category, allCategories).name;
                        
                        if(i == products.length - 1){
                            resolve(products);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                
            } else {
                reject(appHelper.buildResponseMessage(400, "Não foi encontrado nenhum produto"))
            }
            
        })
        .catch((err) => {
            //TODO TRATAR ERRO AQUI
            reject(err);
        })
    })
}