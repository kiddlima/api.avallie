const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let supplier = new mongoose.Schema({
    cnpj: String,
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
    budgetRequests: [String]
}, {versionKey: false});

module.exports = mongoose.model('Supplier', supplier);