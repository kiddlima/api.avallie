const supplierService = require('.././service/supplier.service');

let controller = {}

controller.addSupplier = addSupplier;

module.exports = controller;

function addSupplier(req, res, next){
    console.log(req.body);
    supplierService.addSupplier(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}