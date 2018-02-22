const daoBudgetRequest = require('.././dao/budgetRequest.dao');
const daoSupplier = require('.././dao/supplier.dao');
const daoProduct = require('.././dao/product.dao');
const apiHelper = require('.././helper/api.helper');
const emailHelper = require('.././helper/email.helper');
const Promise = require('promise');

let service = {}

service.addBudgetRequest = addBudgetRequest;

module.exports = service;

function addBudgetRequest(budgetRequest){
    return new Promise((resolve, reject) => {
        if(budgetRequest.clientEmail){
            if(budgetRequest.product){

                daoProduct.getProductById(budgetRequest.product)
                .then((product) => {
                    budgetRequest.product = product._id;
            
                    daoSupplier.getSuppliersByCategory(product.category)
                    .then((suppliers) => {
                        budgetRequest.suppliers = [];
                        for(let i = 0; i < suppliers.length; i++){
                            budgetRequest.suppliers.push(suppliers[i]._id);
                        }
            
                        daoBudgetRequest.addBudgetRequest(budgetRequest)
                        .then((response) => {
                            console.log("Success adding budget", response)
        
                            emailHelper.sendEmail()
                            .then((response) => {
                                resolve(response)
                            })
                            .catch((err) => {
                                reject(err);
                            })

                            //ADICIONAR ESSE ORÇAMENTO AOS FORNECEDORES E ENVIAR O EMAIL PARA OS MESMOS
                        })
                        .catch((err) => {
                            console.log("error adding budget", err)
                            let error = err.errors;
                            resolve(apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        reject(err)
                    });    
                })
                .catch((err) => {
                    reject(err)
                })
            } else {
                reject(apiHelper.buildResponseMessage(400, "Produto não informado"))
            }
        } else {
            reject(apiHelper.buildResponseMessage(400, "Email do cliente não informado"))
        }
    })
}

