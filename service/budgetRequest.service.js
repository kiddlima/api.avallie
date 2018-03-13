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
            {
							id,
							amount,
							manufacturer,
							observation
						}
    ]

} */

function addBudgetRequest(budgetRequest){
    let user = budgetRequest.user;
    let address = budgetRequest.address;
    let deadLine = budgetRequest.deadLine;
    var products = budgetRequest.products;

    return new Promise((resolve, reject) => {
    if(hasValidUser(user)){
        //VALID ADDRESS
        if(hasValidAddress(address)){
            //VALID DEADLINE
            if(deadLine){
                //VALID PRODUCTS
                if(hasProducts(products)){

                    //GET PRODUCTS IDS FROM PRODUCTS ARRAY
                        let productsId = [];
                        for(let i = 0; i < products.length; i++){
                            productsId.push(products[i]._id);
                        }

                        //FILL ALL PRODUCTS WITH ITS FULL VALUES
                        findProductsByIds(productsId)
                        .then((fullProducts) => {
														//FILL ALL THE PRODUCTS INFORMATION, AMOUNT, MANUFACTURER, OBSERVATION
														
														let productObjects = [];

														for(let i = 0; i < fullProducts.length; i++){
															let productObject = fullProducts[i].toObject();

															productObjects.push(productObject);

															productObjects[i].amount = products[i].amount;
															productObjects[i].manufacturer = products[i].manufacturer;
															productObjects[i].observation = products[i].observation;
														}

														//SET FULL PRODUCT ITEM TO BUDGET REQUEST OBJECT
														budgetRequest.products = productObjects;

														//SAVE THIS BUDGET REQUEST ON DATABASE
														daoBudgetRequest.addBudgetRequest(budgetRequest)
														.then((response) => {	

															//BUDGET REQUEST SAVED SUCCESFULLY
															//resolve(apiHelper.buildResponseMessage(200, "Orçamento registrado com succeso. Você receberá um email com todas as informações de sua solicitação."));
															
															budgetRequest = response;

															var matches = findMatchingProductsByCategories(fullProducts);

														//ARRAY OF CATEGORIES
														var categories = getCategoriesFromMatches(matches);
														daoSupplier.getSuppliersByCategories(categories)
															.then((suppliers) => {
																//ARRAY OF MATCHES
																var groupedMatches = groupMatchesBySupplier(matches, suppliers);

																for(let j = 0; j < groupedMatches.length; j++){
																	//SEND EMAIL FOR SUPPLIERS WITH THESE ARRAY OF PRODUCTS
																	emailHelper.sendEmail(getToSupplierEmailInfo(groupedMatches[j], groupedMatches[j][0].emails[0], budgetRequest._id))
																	.then((response) => {

																		if(j == groupedMatches.length - 1){
																			//SEND EMAIL TO USER
																			emailHelper.sendEmail(getToClientEmailInfo(budgetRequest, groupedMatches.length))
																			.then((response) => {
																				resolve(response);
																			})
																			.catch((err) => {
																				reject(err);
																			})
																		}
																	})
																	.catch((err) => {
																		reject(err);
																	})	
																}
														})
														.catch((err) => {
															console.log(err)
														})
																
														})
														.catch((err) => {
															//FAIL TO SAVE BUDGET REQUEST
															let error = err.errors;
            									reject(apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
														});		
														
														
														
                    });    
                    
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

function getCategoriesFromMatches(matches){
	var categories = [];

	for(let i = 0; i < matches.length; i++){
		categories.push(matches[i][0].category);
	}

	return categories;
}

function groupMatchesBySupplier(matches, suppliers){

/* thisSupplierProducts[
		{
			supplier object
		},
		{
			product
		},
		{
			product
		},
		{
			product
		},
		....
] */

	var allSupplierProducts = [];

	for(let i = 0; i < suppliers.length; i++){
		var thisSupplierProducts = [];

		thisSupplierProducts.push(suppliers[i]);
		for(let j = 0; j < matches.length; j++){
				for(let k = 0; k < suppliers[i].categories.length; k++){
					if(matches[j][0].category == suppliers[i].categories[k]){
						//THIS MATCH ARRAY IS FROM THIS SUPPLIERS CATEGORY, SO ADD ALL OF THIS PRODUCTS 
						for(let l = 0; l < matches[j].length; l++){
							if(!thisProductIsInThisArrayAlready(matches[j][l]._id, thisSupplierProducts)){
								thisSupplierProducts.push(matches[j][l]);
							}
						}
					}
				}
		}

		allSupplierProducts.push(thisSupplierProducts);
	}


	return allSupplierProducts;
}

function thisProductIsInThisArrayAlready(productId, array){
	for(let i = 0; i < array.length; i++){
		if(productId == array[i]._id){
			return true;
		}
	}

	return false;
}

function findProductsByIds(products){
    return new Promise((resolve, reject) => {
        for(let i = 0; i < products.length; i++){
            daoProduct.getProductById(products[i])
            .then((product) => {
                //FILL PRODUCT WITH ITS FULL INFORMATION
                products[i] = product;

                if(i == products.length - 1){
                    resolve(products);
                }
            });
        }
    })
    
}

function findMatchingProductsByCategories(products){
    //LIST THAT WILL BE RETURNED WITH FULL MATCHES OBJECTS
    let matchesList = [];

    for(let i = 0; i < products.length; i++){
        
        for(let j = 0; j < products.length; j++){
            if(thisProductIsNotMatchedYet(products[i], matchesList)){
            //IF IS NOT THE SAME PRODUT
                if(products[i]._id != products[j]._id){
										//TRY TO ADD TO EXISTING MATCH ARRAY
										if(tryToAddToExistingMatchArray(products[i], matchesList)){
												//WAS ADDED TO EXISTING MATCH ARRAY
										} else if(products[i].category == products[j].category) {
												//THIS MATCH DOES NOT EXIST YET
												let newMatchArray = [
														products[i],
														products[j]
												]

												//ADD NEW MATCH TO THE LIST
												matchesList.push(newMatchArray);                            
										} else {
											//NO MATCH FOR THIS GUY, ADD A SINGLE MATCH PRODUCT 		
											matchesList.push([products[i]]);
										}
                }
            }
        }
		}
		
    return matchesList;
}

function tryToAddToExistingMatchArray(fullProduct, matches){
    for(let i = 0; i < matches.length; i++){
        if(matches[i][0].category == fullProduct.category){
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
    } else if(!address.number){
        return false
    } else if(!hasValidField(address.city)){
        return false;
    } else {
        return true;
    } 
}

function hasValidField(field){
    return field && field.length > 0;
}

function getToSupplierEmailInfo(products, supplierEmail, budgetRequestId){
		var body = "";

		body += "Produtos solicitados: \n"; 
		//STARTS IN 1 BECAUSE 0 IS THE SUPPLIER
		for(let i = 1; i < products.length; i++){
			body += products[i].name + " \n"
		}

    return {
        from: "comercial@avallie.com",
        to: supplierEmail,
        subject: "Solicitação de orçamento Avallie: " + budgetRequestId,
        text: body + 
        "Envie o orçamento para o email: comercial@avallie.com"
        //TODO ADICIONAR HTML
    }
}

function getToClientEmailInfo(budgetRequest, suppliersLenght){
	var products = "\n";

	for(let i = 0; i < budgetRequest.products; i++){
		products += budgetRequest.products[i].name + "\n";
	}

    return {
        from: "comercial@avallie.com",
        to: budgetRequest.user.email,
        subject: "Solicitação de orçamento Avallie " + budgetRequest._id,
        text: "Sua solicitação de orçamento para os produtos: " +
				products
				+ "Foi enviado para " +
        suppliersLenght + " fornecedores"
    }
}