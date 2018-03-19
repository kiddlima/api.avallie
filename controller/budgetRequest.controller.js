const budgetRequestService = require('.././service/budgetRequest.service');

let controller = {};

controller.addBudgetRequest = addBudgetRequest;
controller.getBudgetRequests = getBudgetRequests;

module.exports = controller;

function addBudgetRequest(req, res, next){
    budgetRequestService.addBudgetRequest(req.body)
    .then((response) => {
        res.status(200);
        res.json(response)
    })
    .catch((err) => {
        res.status(400);
        res.json(err)
    })
}

function getBudgetRequests(req, res, next){
    budgetRequestService.getBudgetRequests(req.body)
    .then((result) => {
        res.status(200);
        res.json(result);
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
    })
}
