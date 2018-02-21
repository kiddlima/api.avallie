const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let budgetRequest = new mongoose.Schema({
    clientEmail: {type: String, required: [true, 'Email de cliente' + requiredMessage]},
    product: {type: String, required: [true, 'Identificador do produto' + requiredMessage]},
    suppliers: [String],
}, {versionKey: false});

module.exports = mongoose.model('BudgetRequest', budgetRequest);