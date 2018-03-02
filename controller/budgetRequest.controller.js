const budgetRequestService = require('.././service/budgetRequest.service');

let controller = {};

controller.addBudgetRequest = addBudgetRequest;

module.exports = controller;

function addBudgetRequest(req, res, next){
    budgetRequestService.addBudgetRequest(req.body)
    .then((response) => {
        res.json(response)
    })
    .catch((err) => {
        console.log(err)
        res.json(err)
    })
}
