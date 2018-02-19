const Categoriy = require('../schema/category.schema');
const Promise = require('promise');

let dao = {};

dao.addCategory = addCategory;

module.exports = dao;

function addCategoriy(category){
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
