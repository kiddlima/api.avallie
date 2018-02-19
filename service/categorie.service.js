const Promise = require('promise');
const dao = require('../dao/supplier.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addCategorie = addCategorie;

module.exports = service;

function addCategorie(categorie){
    return new Promise((resolve, reject) => {
        dao.addCategorie(categorie)
        .then(() => {
            console.log("Resolve service")
            resolve(appHelper.buildResponseMessage(200, "Categoria cadastrada com sucesso"))
        })
        .catch((err) => {
            console.log(err)
            let error = err.errors;
            reject(appHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
        })
    })
}