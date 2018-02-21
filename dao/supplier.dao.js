const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');

let dao = {};

dao.getSuppliersByCategory = getSuppliersByCategory;
dao.addSupplier = addSupplier;

module.exports = dao;

function addSupplier(supplier){
    return new Promise((resolve, reject) => {
        Supplier.create(supplier)
        .then((response) => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
  });
}

function getSuppliersByCategory(category){
    return new Promise((resolve, reject) => {
        Supplier.find({
            "categories": category
        })
        .then((suppliers) => {
            if(suppliers && suppliers.length > 0){
                resolve(suppliers);
            } else {
                reject("Nenhum fornecedor encontrado para essa categoria");
            }
        })
        .catch((err) => {
            console.log(err)
            reject("Erro no banco")
        })
    })
}

