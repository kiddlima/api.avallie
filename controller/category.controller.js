const categoryService = require('.././service/category.service');

let controller = {}

controller.getCategoryByName = getCategoryByName;
controller.addCategories = addCategories;
controller.getAllCategories = getAllCategories;

module.exports = controller;

function addCategories(req, res, next){
    for(let i = 0; i < req.body.length; i++){
        addCategory(req.body[i], (result) => {
            res.json(result);
        })
    }
}

function addCategory(category, callback){
    categoryService.addCategory(category)
    .then((result) => {
        callback(result);
    })
    .catch((err) => {
        callback(err)
    })
}

function getCategoryByName(req, res, next){
    categoryService.getCategoryByName(req.params.category)
    .then((category) => {
        res.json(category);
    })
    .catch((err) => {
        res.json(err);
    })
}

function getAllCategories(req, res, next){
    categoryService.getAllCategories()
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {
        res.json(err)
    })
}

