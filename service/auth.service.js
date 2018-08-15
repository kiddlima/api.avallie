const authDao = require('../dao/auth.dao');
const apiHelper = require('../helper/api.helper');
const jwt = require('jsonwebtoken');

module.exports = {
    registerSupplier: registerSupplier,
    authenticateSupplier: authenticateSupplier
}

function registerSupplier(supplier){
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

function authenticateSupplier(credentials){
    const email = credentials.email;
    const password = credentials.password;

    return new Promise((resolve, reject) => {
        authDao.getSupplierByEmail(email)
        .then((supplier) => {
            authDao.comparePasswords(password, supplier.password)
            .then((isMatch) => {
                if(isMatch){
                    const token = jwt.sign(supplier.toJSON(), 'teste', {expiresIn: '1h'});

                    resolve({
                        token: 'JWT ' + token,
                        email: supplier.email
                    })
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