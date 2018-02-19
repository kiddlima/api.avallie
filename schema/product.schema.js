const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let product = new mongoose.Schema({
    name: {type: String, required: [true, 'Nome' + requiredMessage]},
    categories: {type: [String], required: [true, 'Categoria' + requiredMessage]}
}, {versionKey: false});

module.exports = mongoose.model('Product', product);