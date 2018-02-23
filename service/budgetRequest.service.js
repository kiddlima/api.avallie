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
    // RESPONSE WITH ALL THE MESSAGES
    var budgetRequestResponse = [];

    //USED TO GET INFOS THAT WILL BE SEND ON THE EMAILS
    var budgetResquestToEmail = [];

    return new Promise((resolve, reject) => {
        if(budgetRequest.clientEmail){
            //UPDATE EMAIL ON BUDGETREQUESTTOEMAIL
            budgetResquestToEmail.clientEmail = budgetRequest.clientEmail;

            if(budgetRequest.product){

                daoProduct.getProductById(budgetRequest.product)
                .then((product) => {
                    //UPDATING BUDGET REQUEST PRODUCT ID
                    budgetRequest.product = product._id;

                    //UPDATING BUDGET REQUEST TO EMAIL PRODUCT
                    budgetResquestToEmail.product = product;
            
                    daoSupplier.getSuppliersByCategory(product.category)
                    .then((suppliers) => {
                        budgetRequest.suppliers = [];
                        for(let i = 0; i < suppliers.length; i++){
                            //UPDATE BUGET REQUEST SUPPLIERS ID
                            budgetRequest.suppliers.push(suppliers[i]._id);

                            //ADD SUPPLIERS EMAIL TO EMAILS AUX ARRAY
                            budgetResquestToEmail.suppliers = [];
                            budgetResquestToEmail.suppliers.push({
                                "_id": suppliers[i]._id,
                                "email": suppliers[i].emails[i]
                            });
                        }
            
                        daoBudgetRequest.addBudgetRequest(budgetRequest)
                        .then((response) => {
                            console.log("Success adding budget", response)

                            //ADDING MESSAGE TO RESPONSE
                            budgetRequestResponse.push("Solicitação registrada com sucesso");

                            for(let i = 0; i < budgetRequest.suppliers.length; i++){

                                //SEND EMAIL TO SUPPLIERS
                                emailHelper.sendEmail(getToSupplierEmailInfo(budgetResquestToEmail, budgetResquestToEmail.suppliers[i].email))
                                .then((response) => {

                                    //TODO!!! UPDATE SUPPLIERS BUDGET AMOUNT

                                    if(i == budgetRequest.suppliers.length - 1){
                                        //ADDING MESSAGE TO RESPONSE
                                        budgetRequestResponse.push("Solicitação enviada para " + budgetRequest.suppliers.length + " fornecedores");

                                        //SEND EMAIL TO CLIENT
                                        emailHelper.sendEmail(getToClientEmailInfo(budgetResquestToEmail))
                                        .then((response) => {
                                            //ADDING MESSAGE TO RESPONSE
                                            budgetRequestResponse.push("Enviamos um email para " + budgetRequest.clientEmail + " com as informações de sua solicitação");

                                            resolve(apiHelper.buildResponseMessage(200, budgetRequestResponse));
                                        })
                                        .catch((err) => {
                                            budgetRequestResponse.push("Erro ao enviar email solicitante");
                                            reject(apiHelper.buildResponseMessage(400, budgetRequestResponse));
                                        })
                                    }
                                    
                                })
                                .catch((err) => {
                                    console.log(err)
                                    budgetRequestResponse.push("Erro ao enviar email para fornecedores");
                                    reject(apiHelper.buildResponseMessage(400, budgetRequestResponse));
                                })
                            }

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

function getToSupplierEmailInfo(budgetResquestToEmail, supplierEmail){
    console.log(supplierEmail)
    return {
        from: "vinicius@savisoft.com.br",
        to: supplierEmail,
        subject: "Solicitação de orçamento Avallie",
        text: "Nova solicitação de orçamento do produto: \n " +
        "Nome: "+ budgetResquestToEmail.product.name +
        "Unidade: " + budgetResquestToEmail.product.unity + "\n" +
        "Envie o orçamento para o email: " + budgetResquestToEmail.clientEmail
        //TODO ADICIONAR HTML
    }
}

function getToClientEmailInfo(budgetResquestToEmail){
    return {
        from: "vinicius@savisoft.com.br",
        to: budgetResquestToEmail.clientEmail,
        subject: "Solicitação de orçamento Avallie",
        text: "Sua solicitação de orçamento do produto" +
        budgetResquestToEmail.product.name + "foi enviado para " +
        budgetResquestToEmail.suppliers.length + " fornecedores"
    }
}