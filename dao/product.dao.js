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
    var query = {};

    if(filter.categories && filter.unity){
        console.log("Tem todos os filtros")
        query = {
            "category": {$in : filter.categories},
            "unity": filter.unity
        }
    } else if(filter.categories) {
        console.log("Tem só categoria")
        query = {
            "category": {$in : filter.categories}
        }
    } else if(filter.unity){
        console.log("Tem só unidade")
        query = {
            "unity": filter.unity
        }
    } else {
        console.log("Nenhum filtro")
        query = null;
    }

    return query;
}