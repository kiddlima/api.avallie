const categorieService = require('.././service/categorie.service');

let controller = {}

controller.addCategories = addCategories;

module.exports = controller;

function addCategories(req, res, next){
    for(let i = 0; i < req.body.length; i++){
        addCategorie(req.body[i], (result) => {
            res.json(result);
        })
    }
}

function addCategorie(categorie, callback){
    categorieService.addCategorie(categorie)
    .then((result) => {
        callback(result);
    })
    .catch((err) => {
        callback(err)
    })
}