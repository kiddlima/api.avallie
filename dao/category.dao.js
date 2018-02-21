const Category = require('../schema/category.schema');
const Promise = require('promise');

let dao = {};

dao.getCategoryById = getCategoryById;
dao.addCategory = addCategory;
dao.getCategoryByName = getCategoryByName;
dao.getAllCategories = getAllCategories;

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
    return new Promise((resolve, reject) => {
        Category.findOne({
            "name": name
        })
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getCategoryById(id){
    return new Promise((resolve, reject) => {
        Category.findOne({
            "_id": id
        })
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getAllCategories(){
    return new Promise((resolve, reject) => {
        Category.find({})
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}