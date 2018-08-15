const Supplier = require('../schema/supplier.schema');
const bcrypt = require('bcryptjs');

let dao = {};

dao.registerSupplier = registerSupplier;
dao.getSupplierByEmail = getSupplierByEmail;
dao.comparePasswords = comparePasswords;

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

function getSupplierByEmail(email){
    return new Promise((resolve, reject) => {
        Supplier.findOne({"email": email})
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function comparePasswords(password, hash){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if(err){
                reject(err);
            } else {
                resolve(isMatch);
            }
        })
    })
}