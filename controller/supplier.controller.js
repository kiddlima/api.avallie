const supplierService = require('.././service/supplier.service');
const appHelper = require('.././helper/api.helper');

let controller = {}

controller.addSupplier = addSupplier;
controller.addSuppliers = addSuppliers;
controller.getSupplier = getSupplier;

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

function getSupplier(req, res, next){
    supplierService.getSupplier(req.headers.authorization)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log(err)
        res.json(err);
    })
}
