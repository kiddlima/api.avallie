const mongoose = require('mongoose');

const requiredMsg = ' é obrigatório.';
const maxLengthMsg = 'limite de caracteres excedido no campo ';

let supplier = new mongoose.Schema({
    cpnj: {type: String, required: [true, 'CNPJ' + requiredMsg], trim: true, maxlength: [17, maxLengthMsg + 'cnpj']},
    socialReason : {type: String, required: [true, 'Razão social' + requiredMsg]},
    fantasyName: {type: String, required: [true, 'Nome fantasia' + requiredMsg]},
    responsable: {type: String, required: [true, 'Responsável' + requiredMsg]},
    phones: {type: [String], required: [true, 'Telefone' + requiredMsg]},
    emails: {type: [String], required: [true, 'Email' + requiredMsg]},
    address: {type:[
        {
            street: String,
            number: Number,
            city: String
        }
    ], required: [true, 'Endereço' + requiredMsg]},
    urls: [String],
    categories: {type: [String], required: [true, 'Categoria' + requiredMsg]}
});

module.exports = mongoose.model('Supplier', supplier);