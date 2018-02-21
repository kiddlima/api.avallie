const categoryService = require('.././service/category.service');

let controller = {}

controller.addCategories = addCategories;

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