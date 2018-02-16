const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');

let dao = {};

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