const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');
const dao = require('../dao/supplier.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addSupplier = addSupplier;

module.exports = service;

function addSupplier(supplier){
      return new Promise((resolve, reject) => {    
        dao.addSupplier(supplier)
        .then(() => {  
            resolve(appHelper.buildResponseMessage(200, "Fornecedor cadastrado com sucesso"));     
        })
        .catch((err) => {
            var response = {};
            console.log(err)
            //CHECK IF ITS A DUPLICATED CNPJ
            if (err.name === 'MongoError' && err.code === 11000) {
                response = appHelper.buildResponseMessage(400, "CNPJ já existe");
            } else {
                //REGULAR REQUIRED FIELD ERROR
                let error = err.errors;
                response = appHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message)
            }

            reject(response);
        });
    });
}