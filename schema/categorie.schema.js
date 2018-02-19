const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let categorie = new mongoose.Schema({
    name: {type: String, required: [true, 'Nome da categoria' + requiredMessage], unique: true}
}, {versionKey: false});

module.exports = mongoose.model('Categorie', categorie);