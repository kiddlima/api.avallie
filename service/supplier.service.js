const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');
const dao = require('../dao/supplier.dao');

let service = {};

service.addSupplier = addSupplier;

module.exports = service;

function addSupplier(supplier){
      return new Promise((resolve, reject) => {    
        dao.addSupplier(supplier)
        .then(() => {  
            resolve("Adicionado com sucesso");       
        })
        .catch((err) => {
            let error = err.errors;
            reject({
            "status": 400,
            "msg": error[Object.keys(error)[0]].properties.message
            });
        });
    });
}