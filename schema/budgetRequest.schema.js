const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let budgetRequest = new mongoose.Schema({
    user: {
        email: {type: String, required: [true, 'Email' + requiredMessage]},
        name: {type: String, required: [true, 'Nome' + requiredMessage]},
        phone: {type: String, required: [true, 'Telefone' + requiredMessage]},
        cpf: {type: String, required: [true, 'CPF' + requiredMessage]}
    },
    address: {
        address: {type: String, required:[true, 'Endereço' + requiredMessage]},
        number: {type: Number, required: [true, 'Número' + requiredMessage]},
        city: {type: String, required: [true, 'Cidade' + requiredMessage]}
    },
    deadLine: {type: Date, required: [true, 'Prazo de entrega', requiredMessage]},
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
    ]
}, {versionKey: false});

module.exports = mongoose.model('BudgetRequest', budgetRequest);