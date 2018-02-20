const Category = require('../schema/category.schema');
const Promise = require('promise');

let dao = {};

dao.addCategory = addCategory;
dao.getCategoryByName = getCategoryByName;

module.exports = dao;

function addCategory(category){
    return new Promise((resolve, reject) => {
        Category.create(category)
        .then((response) => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getCategoryByName(name){
    console.log(name)
    return new Promise((resolve, reject) => {
        Category.findOne({
            "name": name
        })
        .then((response) => {
            console.log("success dao")
            resolve(response);
        })
        .catch((err) => {
            console.log("error dao")
            reject(err);
        })
    })
}