const daoBudgetRequest = require('.././dao/budgetRequest.dao');
const daoSupplier = require('.././dao/supplier.dao');
const daoProduct = require('.././dao/product.dao');
const apiHelper = require('.././helper/api.helper');
const emailHelper = require('.././helper/email.helper');
const Promise = require('promise');

let service = {}

service.addBudgetRequest = addBudgetRequest;

module.exports = service;

/* {
    user{
        name,
        email,
        cpf,
        phone
    },

    address{
        addres,
        number,
        city
    },

    deadline,

    products[
            id
    ]

} */

function addBudgetRequest(budgetRequest){
    let user = budgetRequest.user;
    let address = budgetRequest.address;
    let deadLine = budgetRequest.deadLine;
    let products = budgetRequest.products;

    return new Promise((resolve, reject) => {
        //VALID USER
        if(hasValidUser(user)){
            //VALID ADDRESS
            if(hasValidAddress(address)){
                //VALID DEADLINE
                if(deadLine){
                    //VALID PRODUCTS
                    if(hasProducts()){
                        let matches = findMatchingProductsByCategories();
                        
                        /* 
                            matches [
                                [
                                    {
                                    product...

                                    }, 
                                    {
                                        product ...
                                    }
                                ],
                                ... 
                            ]
                        */

                        for(let i = 0; i < matches.length; i++){

                            //GET SUPPLIERS FOR THOSE PROCUTS
                            daoSupplier.getSuppliersByCategory(matches[i].category)
                            .then((suppliers) => {
                                //SEND EMAIL FOR SUPPLIERS WITH THESE ARRAY OF PRODUCTS

                                
                            })

                            for(let j = 0; j < matches[i].length; i++){


                                
                                



                            }
                        }


                    } else {
                        reject(apiHelper.buildResponseMessage(400, "Nenhum produto solicitado"))        
                    }
                } else {
                    reject(apiHelper.buildResponseMessage(400, "Prazo de entrega inválido ou não informado"))    
                }
            } else {
                reject(apiHelper.buildResponseMessage(400, "Endereço inválido ou não informado"))
            }
        } else {
            reject(apiHelper.buildResponseMessage(400, "Usuário inválido ou não informado"))
        }
    });
}

function findMatchingProductsByCategories(products){

    //LIST THAT WILL BE RETURNED WITH FULL MATCHES OBJECTS

    let groupedProductsBasedOnMatches = [];
    for(let i = 0; i < products.length; i++){
        //FILLED PRODUCT
        let fullProduct;

        daoProduct.getProductById(products[i])
        .then((product) => {
            //FILL PRODUCT WITH ITS FULL INFORMATION
            fullProduct = product;

            if(thisProductIsNotMatchedYet()){
                for(let j = 0; j < products.length; j++){
                    if(fullProduct._id == products[j]._id){
                        if(tryToAddToExistingMatchArray(fullProduct, groupedProductsBasedOnMatches)){
                            //WAS ADDED TO EXISTING MATCH ARRAY
                        } else {
                            //THIS MATCH DOES NOT EXIST YET
                            let newMatchArray = [
                                fullProduct,
                                products[j]
                            ]

                            //ADD NEW MATCH TO THE LIST
                            groupedProductsBasedOnMatches.push(newMatchArray);                            
                        }
                    }
                }
            }
        });
    }

    return groupedProductsBasedOnMatches;
}

function tryToAddToExistingMatchArray(fullProduct, matches){
    for(let i = 0; i < matches.length; i++){
        if(matches[i].category == fullProduct.category){
            //THERE'S ALREADY A MATCH ARRAY FOR THIS CATEGORY

            //ADD THIS PRODUCT TO THIS ARRAY
            matches[i].push(fullProduct);

            return true;
        }
    }

    return false;
}

function thisProductIsNotMatchedYet(product, matchesList){
    //CHECK IF PRODUCT HAS NOT BEEN MATCHED YET, TO AVOID MULTIPLE MATCHED ARRAYS
    for(let i = 0; i < matchesList.length; i++){
        for(let j = 0; j < matchesList[i].length; j++){
            if(product._id == matchesList[i][j]._id){
                return false;
            }
        }
    }

    return true;
}

function hasProducts(products){
    return products && products.length > 0;
}

function hasValidUser(user){
    if(!hasValidField(user.email)){
        return false;
    } else if(!hasValidField(user.name)){
        return false
    } else if(!hasValidField(user.cpf)){
        return false;
    } else if(!user.phone){
        return false;
    } else {
        return true;
    }
}

function hasValidAddress(address){
    if(!hasValidField(address.address)){
        return false;
    } else if(address.number){
        return false
    } else if(!hasValidField(address.city)){
        return false;
    } 
}

function hasValidField(field){
    return field && field.length > 0;
}

function addBudgetRequest(budgetRequest){
    // RESPONSE WITH ALL THE MESSAGES
    var budgetRequestResponse = [];

    //USED TO GET INFOS THAT WILL BE SEND ON THE EMAILS
    var budgetResquestToEmail = [];

    for(let i = 0; i < budgetRequest.length; i++){
        if(budgetRequest.clientEmail){
            //UPDATE EMAIL ON BUDGETREQUESTTOEMAIL
            budgetResquestToEmail.clientEmail = budgetRequest.clientEmail;
            budgetResquestToEmail.amount = budgetRequest.amount;
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
                            
                            //ADDING MESSAGE TO RESPONSE
                            budgetRequestResponse.push("Solicitação registrada com sucesso");
    
                            for(let i = 0; i < budgetRequest.suppliers.length; i++){
    
                                //SEND EMAIL TO SUPPLIERS
                                emailHelper.sendEmail(getToSupplierEmailInfo(budgetResquestToEmail, budgetResquestToEmail.suppliers[i].email))
                                .then((response) => {
    
                                    //ADDING BUDGET TO SUPPLIER
                                    daoSupplier.addBudgetRequestToSupplier(response._id, budgetRequest.suppliers[i]._id)
                                    .then((response) => {
                                        console.log("Fornecedor atualizado com sucesso")
                                    })
                                    .catch((err) => {
                                        console.log("Fornecedor não atualizado")
                                    })
    
                                    if(i == budgetRequest.suppliers.length - 1){
                                        //ADDING MESSAGE TO RESPONSE
                                        budgetRequestResponse.push("Solicitação enviada para " + budgetRequest.suppliers.length + " fornecedores");
    
                                        //SEND EMAIL TO CLIENT
                                        emailHelper.sendEmail(getToClientEmailInfo(budgetResquestToEmail))
                                        .then((response) => {
                                            //ADDING MESSAGE TO RESPONSE
                                            budgetRequestResponse.push("Enviamos um email para " + budgetRequest.clientEmail + " com as informações de sua solicitação");
    
                                        //    resolve(apiHelper.buildResponseMessage(200, budgetRequestResponse));
                                        })
                                        .catch((err) => {
                                            budgetRequestResponse.push("Erro ao enviar email solicitante");
                                        //    reject(apiHelper.buildResponseMessage(400, budgetRequestResponse));
                                        })
                                    }
                                    
                                })
                                .catch((err) => {
                                    budgetRequestResponse.push("Erro ao enviar email para fornecedores");
                              //      reject(apiHelper.buildResponseMessage(400, budgetRequestResponse));
                                })
                            }
                        })
                        .catch((err) => {
                            console.log("error adding budget", err)
                            let error = err.errors;
                            //resolve(apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        //reject(err)
                    });    
                })
                .catch((err) => {
                    //reject(err)
                })
            } else {
                //reject(apiHelper.buildResponseMessage(400, "Produto não informado"))
            }
        } else {
            //reject(apiHelper.buildResponseMessage(400, "Email do cliente não informado"))
        }
    }
    
}

function getToSupplierEmailInfo(budgetResquestToEmail, supplierEmail){
    return {
        from: "vinicius@savisoft.com.br",
        to: supplierEmail,
        subject: "Solicitação de orçamento Avallie",
        text: "Nova solicitação de orçamento do produto: \n " +
        "Nome: "+ budgetResquestToEmail.product.name +
        "Unidade: " + budgetResquestToEmail.product.unity + "\n" +
        "Quantidade: " + budgetResquestToEmail.amount + "\n" +
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