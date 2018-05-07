const BudgetRequest = require('../schema/budgetRequest.schema');
const Promise = require('promise');

let dao = {};

dao.addBudgetRequest = addBudgetRequest;
dao.getBudgetRequests = getBudgetRequests;
dao.updateBudgetRequestStatus = updateBudgetRequestStatus;

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