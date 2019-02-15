const authDao = require('../dao/auth.dao');
const supplierDao = require('../dao/supplier.dao');
const apiHelper = require('../helper/api.helper');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    registerSupplier: registerSupplier,
    authenticateSupplier: authenticateSupplier,
    verifySupplier: verifySupplier
}

function registerSupplier(supplier) {
    return new Promise((resolve, reject) => {
        authDao.registerSupplier(supplier)
            .then((result) => {
                resolve(apiHelper.buildResponseMessage(200, "Fornecedor cadastrado com sucesso"));
            })
            .catch((err) => {
                var response = {};
                //CHECK IF ITS A DUPLICATED CNPJ
                if (err.name === 'MongoError' && err.code === 11000) {
                    response = apiHelper.buildResponseMessage(400, "CNPJ já existe");
                } else {
                    //REGULAR REQUIRED FIELD ERROR
                    let error = err.errors;
                    response = apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message)
                }

                reject(err);
            });
    });
}

function verifySupplier(token) {
    return new Promise((resolve, reject) => {
        let secretToken = fs.readFileSync('./api.key', 'utf8');
        try {
            var decode = jwt.verify(token, secretToken);

            resolve(decode);
        } catch (e) {
            reject(apiHelper.buildResponseMessage(401, "Usuário não autorizado"));
        }
    })
}

function authenticateSupplier(credentials) {
    const email = credentials.email;
    const password = credentials.password;

    return new Promise((resolve, reject) => {
        authDao.getSupplierByEmail(email)
            .then((supplier) => {
                authDao.comparePasswords(password, supplier.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            const token = jwt.sign(supplier.toJSON(), fs.readFileSync('./api.key', 'utf8'), { expiresIn: '10h' });

                            resolve({
                                token: 'JWT ' + token,
                                email: supplier.email
                            })
                        } else {
                            reject(apiHelper.buildResponseMessage(400, "Dados incorretos"));
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
            .catch((err) => {
                reject(apiHelper.buildResponseMessage(400, "Usuário não cadastrado"));
            })
    })

}