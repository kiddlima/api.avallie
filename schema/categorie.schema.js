const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let categorie = new mongoose.Schema({
    name: {type: String, required: [true, 'Nome da categoria' + requiredMessage]}
});

module.exports = mongoose.model('Categorie', categorie);