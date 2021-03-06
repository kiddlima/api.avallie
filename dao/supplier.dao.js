const Supplier = require('../schema/supplier.schema');
const Promise = require('promise');

let dao = {};

dao.getSuppliersByCategories = getSuppliersByCategories;
dao.addSupplier = addSupplier;
dao.addSuppliers = addSuppliers;
dao.updateBudgetRequests = updateBudgetRequests;
dao.addBudgetRequestToSupplier = addBudgetRequestToSupplier;
dao.findSupplierById = findSupplierById;

module.exports = dao;

function addSupplier(supplier) {
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

function updateBudgetRequests(idSupplier, budgetRequest) {
    return new Promise((resolve, reject) => {
        Supplier.update(
            { _id: idSupplier },
            { $push: { 'budgetRequests': budgetRequest } }
        )
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

function getSuppliersByCategories(categories) {
    return new Promise((resolve, reject) => {
        Supplier.find({
            "categories": { $elemMatch: { $in: categories } }
        })
            .then((suppliers) => {
                if (suppliers && suppliers.length > 0) {
                    resolve(suppliers);
                } else {
                    reject("Nenhum fornecedor encontrado para essa categoria");
                }
            })
            .catch((err) => {
                reject("Erro no banco")
            })
    })
}

function addSuppliers(suppliers) {
    return new Promise((resolve, reject) => {
        Supplier.insertMany(suppliers)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

function addBudgetRequestToSupplier(budgetRequestId, supplierId) {
    return new Promise((resolve, reject) => {
        Supplier.findByIdAndUpdate(supplierId,
            {
                "$push": { "budgetRequests": budgetRequestId }
            }
        )
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    })
}

function findSupplierById(id) {
    return new Promise((resolve, reject) => {
        Supplier.findOne({"_id": id}).populate('user' , '-password')
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

