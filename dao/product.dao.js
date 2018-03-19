const Product = require('../schema/product.schema');
const Promise = require('promise');

let dao = {};

dao.addProduct = addProduct;
dao.getProductById = getProductById;
dao.getProducts = getProducts;
dao.addProducts = addProducts;

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
        Product.find(
            getProductQuery(filter), null,
            {
                sort: {name: 1}
            }
        )
        .then((products) => {
            resolve(products)
        })
        .catch((err) => {
            console.log("erro mongo")
            reject(err);
        })
    })
}

function getProductById(id){
    return new Promise((resolve, reject) => {
        Product.findOne({
            "_id": id
        })
        .then((product) => {
            resolve(product)
        })
        .catch((err) => {
            console.log("erro mongo")
            reject("Erro no mongo");
        })
    })
}

function addProducts(products){
    return new Promise((resolve, reject) => {
        Product.insertMany(products)
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
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