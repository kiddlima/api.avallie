const BudgetRequest = require('../schema/budgetRequest.schema');
const Promise = require('promise');

let dao = {};

dao.addBudgetRequest = addBudgetRequest;

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