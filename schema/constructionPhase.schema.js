const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let constructionPhase = new mongoose.Schema({
    name: {type: String, required: [true, 'Nome da fase de obra' + requiredMessage], unique: true},
    categories: {type: [String], required: ['Categoria']}
}, {versionKey: false});

module.exports = mongoose.model('ConstructionPhase', constructionPhase);