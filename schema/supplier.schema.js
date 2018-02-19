const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let supplier = new mongoose.Schema({
    cpnj: {type: String, required: [true, 'CNPJ' + requiredMessage], unique: [true, "CNPJ ja cadastrado"], dropDubs : true},
    socialReason : {type: String, required: [true, 'Razão social' + requiredMessage]},
    fantasyName: {type: String, required: [true, 'Nome fantasia' + requiredMessage]},
    responsable: {type: String, required: [true, 'Responsável' + requiredMessage]},
    phones: {type: [String], required: [true, 'Telefone' + requiredMessage]},
    emails: {type: [String], required: [true, 'Email' + requiredMessage]},
    address: {type:[
        {
            street: String,
            number: Number,
            city: String
        }
    ], required: [true, 'Endereço' + requiredMessage]},
    urls: [String],
    categories: {type: [String], required: [true, 'Categoria' + requiredMessage]},
    budgetRequests: [String]
}, {versionKey: false});

module.exports = mongoose.model('Supplier', supplier);