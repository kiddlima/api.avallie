const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let product = new mongoose.Schema({
    name: {type: String, required: [true, 'Nome' + requiredMessage]},
    category: {type: String, required: [true, 'Categoria' + requiredMessage]},
    unity: {type: String}
}, {versionKey: false});

module.exports = mongoose.model('Product', product);