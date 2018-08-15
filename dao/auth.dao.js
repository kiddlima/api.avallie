const Supplier = require('../schema/supplier.schema');
const bcrypt = require('bcryptjs');

let dao = {};

dao.registerSupplier = registerSupplier;

module.exports = dao;

function registerSupplier(supplier){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(supplier.password, salt, (err, hash) => {
                if(err){
                    reject(err);
                } else{
                    supplier.password = hash;
                    Supplier.create(supplier)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                }
                    
            })
        })
    });
}