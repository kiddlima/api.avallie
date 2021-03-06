const budgetRequestService = require('.././service/budgetRequest.service');

let controller = {};

controller.addBudgetRequest = addBudgetRequest;
controller.getBudgetRequests = getBudgetRequests;
controller.updateBudgetRequest =updateBudgetRequest;
controller.updateSupplierStatus = updateSupplierStatus;
controller.updateProductBudget = updateProductBudget;

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

function updateProductBudget(req, res, next){
    budgetRequestService.updateProductBudget(req.body.budgetRequestId, req.body.supplierId, req.body.productId, req.body.brand, req.body.price, req.body.observation)
    .then((response) => {
        res.status(200);
        res.json(response);
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
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

function updateBudgetRequest(req, res, next){
    budgetRequestService.updateBudgetRequest(req.params.id, req.body.status)
    .then((result) => {
        res.status(200);
        res.json(result);
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
    })
}

function updateSupplierStatus(req, res, next){
    budgetRequestService.updateSupplierStatus(req.body.budgetRequestId, req.body.supplierId, req.body.status)
    .then((result) => {
        res.status(200);
        res.json(result)
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
    })
}
