const categoryService = require('.././service/category.service');

let controller = {}

controller.addcategories = addcategories;

module.exports = controller;

function addcategories(req, res, next){
    for(let i = 0; i < req.body.length; i++){
        addcategory(req.body[i], (result) => {
            res.json(result);
        })
    }
}

function addcategory(category, callback){
    categoryService.addcategory(category)
    .then((result) => {
        callback(result);
    })
    .catch((err) => {
        callback(err)
    })
}