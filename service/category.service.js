const Promise = require('promise');
const dao = require('../dao/category.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addCategory = addCategory;

module.exports = service;

function addCategory(category){
    return new Promise((resolve, reject) => {
        dao.addCategory(category)
        .then(() => {
            resolve(appHelper.buildResponseMessage(200, "Categoria cadastrada com sucesso"))
        })
        .catch((err) => {
            let error = err.errors;
            reject(appHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
        })
    })
}