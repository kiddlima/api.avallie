const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');
const dao = require('../dao/supplier.dao');
const daoCategory = require('../dao/category.dao');
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

    var categories = [];

    return new Promise((resolve, reject) => {
        daoCategory.getAllCategories()
        .then((result) => {
            categories = result;
            for(let i = 0; i < suppliers.length; i++){
                suppliers[i] = appHelper.getNewFormattedSupplier(suppliers[i]);
    
                formattedSuppliers[i] = suppliers[i];
    
                //FIND THE CATEGORY INSIDE BASED ON ALL CATEGORIES ARRAY
                formattedSuppliers[i].categories = findCategoriesInsideArray(formattedSuppliers[i].categories, categories);
            }

            addFormatedSuppliers(formattedSuppliers)
            .then((result) => {
<<<<<<< HEAD
                resolve(resolve);
=======
                if(i == suppliers.length - 1){
                    resolve(i + " fornecedores cadastrados \n Tamanho do array de suppliers: " + suppliers.length);
                }
>>>>>>> 0f21037c9a1b29201f0223066b9118f96cbf4bd1
            })
            .catch((err) => {
                reject(err);
            });
        })
        .catch((err) => {
            console.log(err);
        })
    });
}

function findCategoriesInsideArray(supplierCategories, allCategories){
    var categoriesIds = [];
    for(let j = 0; j < allCategories.length; j++){
        for(let i = 0; i < supplierCategories.length; i++){
            if(allCategories[j].name == supplierCategories[i]){
                categoriesIds.push(allCategories[j].id);
            }
        }
    }

    return categoriesIds;
}


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




