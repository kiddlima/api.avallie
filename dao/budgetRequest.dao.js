const BudgetRequest = require('../schema/budgetRequest.schema');
const Promise = require('promise');

let dao = {};

dao.addBudgetRequest = addBudgetRequest;
dao.getBudgetRequests = getBudgetRequests;
dao.updateBudgetRequestStatus = updateBudgetRequestStatus;
dao.updateBudgetSupplierStatus = updateBudgetSupplierStatus;
dao.updateProductBudget = updateProductBudget;

module.exports = dao;

function addBudgetRequest(budgetRequest){
    return new Promise((resolve, reject) => {
        BudgetRequest.create(budgetRequest)
        .then((response) => {   
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function updateBudgetRequestStatus(id, status){
    return new Promise((resolve, reject) => {
        BudgetRequest.findOneAndUpdate({"_id": id}, {status: status})
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        });
    });
}

function getBudgetRequests(){
    return new Promise((resolve, reject) => {
        BudgetRequest.find({})
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function updateBudgetSupplierStatus(budgetRequestId, supplierId ,status){
    return new Promise((resolve, reject) => {
        BudgetRequest.update(
            { 
            "_id" : budgetRequestId, 
            "suppliers.supplierId" : supplierId
            },
            { 
            $set : { "suppliers.$.status" : status } 
            })
            .then((response) => {
                if(response.nModified == 0){
                    reject("Nenhum registro foi modificado")
                } else {
                    resolve("Sucesso ao alterar status");
                }
            })
            .catch((err) => {
                reject("Erro no banco de dados");
            })
    });
}

function updateProductBudget(budgetRequestId, supplierId, productId, budget){
    return new Promise((resolve, reject) => {
        BudgetRequest.findOne( {"_id": budgetRequestId}, (error, doc) => {
            if(!error){
                doc = getUpdatedBudgetRequest(doc, supplierId, productId, budget);
                doc.save(function (error){
                    if(error){
                        reject(err);
                    } else {
                        resolve(); 
                    }
                });
            } else {
                reject(err);
            }
        })
    })
}

function getUpdatedBudgetRequest(budgetRequest, supplierId, productId, budget){
    for(let i = 0; i < budgetRequest.suppliers.length; i++){
        if(budgetRequest.suppliers[i].supplierId == supplierId){
            let supplier = budgetRequest.suppliers[i];

            for(let j = 0; j < supplier.products.length; j++){
                if(supplier.products[j]._id.toString() == productId){

                    supplier.products[j].budgets.push(budget);

                    return budgetRequest;
                }
            }
        }
    }
}