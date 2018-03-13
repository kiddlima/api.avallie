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
    return new Promise((resolve, reject) => {
        for(let i = 0; i < suppliers.length; i++){
            suppliers[i] = appHelper.getNewFormattedSupplier(suppliers[i]);
    
            //AUX ARRAY TO CATEGORIES
            var categoriesIDs = [];
    
            for(let j = 0; j < suppliers[i].categories.length; j++){
                daoCategory.getCategoryByName(suppliers[i].categories[j])
                .then((result) => {
                    categoriesIDs.push(result._id);
    
                    //FINISHED TO FILL CATEGORIES
                    if(j == suppliers[i].categories.length - 1){
                        
                        suppliers[i].categories = categoriesIDs;
    
                    }
                    if(i == suppliers.length - 1){
                        addFormatedSuppliers(suppliers)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    }                        
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            
        }
    });
}

function addFormatedSuppliers(suppliers){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < suppliers.length; i++){
            dao.addSupplier(suppliers[i])
            .then((result) => {
                if(i == suppliers.length - 1){
                    resolve(i + " fornecedores cadastrados \n Tamanho do array de suppliers: " + suppliers.length);
                }
            })
            .catch((err) => {
                reject(err);
            });
        }
    })
}




