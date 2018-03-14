const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let supplier = new mongoose.Schema({
    cnpj: {type: String, dropDubs : false},
    socialReason : String,
    fantasyName: String,
    responsable: String,
    phones: [String],
    emails: {type: [String], required: [true, 'Email' + requiredMessage]},
    city: [String],
    state: [String],
    cep: [String],
    address: [String],
    urls: [String],
    categories: {type: [String], required: [true, 'Categoria' + requiredMessage]},
    budgetRequests: [{
        budgetRequest_id: String,
        user:{
            name: String,
            email: String,
            cpf: String,
            phone: String,
        },
        address: {
            address: String,
            number: Number,
            city: String
        },
        deadLine: Date,
        products:[
            {
                _id: {type: String, required: [true, 'Id' + requiredMessage]},
                name: {type: String, required: [true, 'Nome' + requiredMessage]},
                category: {type: String, required: [true, 'Categoria' + requiredMessage]},
                unity: {type: String},
                amount: Number,
                manufacturer: String,
                observation: String
            }
        ],
    }]
}, {versionKey: false});

module.exports = mongoose.model('Supplier', supplier);