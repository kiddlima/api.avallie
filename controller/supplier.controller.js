const supplierService = require('.././service/supplier.service');
const daoCategory = require('.././dao/category.dao');
const appHelper = require('.././helper/api.helper');

let controller = {}

controller.addSupplier = addSupplier;
controller.addSuppliers = addSuppliers;

module.exports = controller;

function addSupplier(req, res, next){
    supplierService.addSupplier(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}

function addSuppliers(req, res, next){
    supplierService.addSuppliers(req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
}
