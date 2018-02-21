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
    for(let i = 0; i < req.body.length; i++){
        var supplier = appHelper.getNewFormattedSupplier(req.body[i]);

        //AUX ARRAY TO CATEGORIES
        var categoriesIDs = [];

        for(let j = 0; j < supplier.categories.length; j++){
            daoCategory.getCategoryByName(supplier.categories[j])
            .then((result) => {
                categoriesIDs.push(result._id);

                //FINISHED TO FILL CATEGORIES
                if(j == supplier.categories.length - 1){
                    
                    supplier.categories = categoriesIDs;

                    //ADD NEW FORMATED SUPPLIER
                    supplierService.addSupplier(supplier)
                    .then((result) => {
                        if(i == req.body.length - 1){
                            res.json(result);
                        }
                    })
                    .catch((err) => {
                        if(i == req.body.length - 1){
                            res.json(err);
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    }
}