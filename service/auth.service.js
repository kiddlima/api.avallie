const authDao = require('../dao/auth.dao');
const apiHelper = require('../helper/api.helper');

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

}