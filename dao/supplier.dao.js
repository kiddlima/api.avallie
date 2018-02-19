const Supplier = require('../schema/supplier.schema');
const Categorie = require('../schema/categorie.schema');
const Promise = require('promise');

let dao = {};

dao.addSupplier = addSupplier;
dao.addCategorie = addCategorie;

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

function addCategorie(categorie){
    return new Promise((resolve, reject) => {
        Categorie.create(categorie)
        .then((response) => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}