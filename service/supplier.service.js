const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');
const dao = require('../dao/supplier.dao');
const appHelper = require('../helper/api.helper')

let service = {};

service.addSupplier = addSupplier;
service.addSuppliers = addSuppliers;

module.exports = service;

function addSupplier(supplier){
      return new Promise((resolve, reject) => {    
        dao.addSupplier(supplier)
        .then(() => {  
            resolve(appHelper.buildResponseMessage(200, "Fornecedor cadastrado com sucesso"));     
        })
        .catch((err) => {
            var response = {};
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

function addSuppliers(suppliers){
    var formattedSuppliers = [];

    return new Promise((resolve, reject) => {
        for(let i = 0; i < suppliers.length; i++){
            suppliers[i] = appHelper.getNewFormattedSupplier(suppliers[i]);

            formattedSuppliers[i] = suppliers[i];
        }

        addFormatedSuppliers(formattedSuppliers)
        .then((result) => {
            resolve(resolve);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

/* function findCategoriesInsideArray(supplierCategories, allCategories){
    var categoriesIds = [];
    for(let j = 0; j < allCategories.length; j++){
        for(let i = 0; i < supplierCategories.length; i++){
            if(allCategories[j].name == supplierCategories[i]){
                categoriesIds.push(allCategories[j].id);
            }
        }
    }

    return categoriesIds;
} */


function addFormatedSuppliers(suppliers){
    return new Promise((resolve, reject) => {
        dao.addSuppliers(suppliers)
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
    })
}




