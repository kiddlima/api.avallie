const Promise = require('promise');
const dao = require('../dao/category.dao');
const apiHelper = require('../helper/api.helper')

let service = {};

service.getCategoryByName = getCategoryByName;
service.addCategory = addCategory;
service.getAllCategories = getAllCategories;

module.exports = service;

function addCategory(category){
    return new Promise((resolve, reject) => {
        dao.addCategory(category)
        .then(() => {
            resolve(apiHelper.buildResponseMessage(200, "Categoria cadastrada com sucesso"))
        })
        .catch((err) => {
            let error = err.errors;
            reject(apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
        })
    })
}

function getCategoryByName(name){
    return new Promise((resolve, reject) => {
        dao.getCategoryByName(name)
        .then((category) => {
            resolve(category);
        })
        .catch((err)=> {
            reject(apiHelper.buildResponseMessage(400, err));
        })
    })
}

function getAllCategories(){
    return new Promise((resolve, reject) => {
        dao.getAllCategories()
        .then((categories) => {
            resolve(categories);
        })
        .catch((err) => {
            reject(apiHelper.buildResponseMessage(400, err));
        })
    })
}