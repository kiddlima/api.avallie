const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let supplier = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Email' + requiredMessage]
    },
    password: {
        type: String,
        required: true
    },
    cnpj: String,
    socialReason : String,
    fantasyName: String,
    responsable: String,
    phones: [String],
    city: [String],
    state: [String],
    cep: [String],
    address: [String],
    urls: [String],
    categories: {
        type: [String], 
        required: [true, 'Categoria' + requiredMessage]
    },
    budgetRequests: [{
        budgetRequest_id: String,
        user:{
            name: String,
            email: String,
            cpf: String,
            phone: String,
        },
        address: {
            address: String,
            number: Number,
            city: String
        },
        deadLine: Date,
        products:[
            {
                _id: {
                    type: String, 
                    required: [true, 'Id' + requiredMessage]
                },
                name: {
                    type: String, 
                    required: [true, 'Nome' + requiredMessage]
                },
                category: {
                    type: String, 
                    required: [true, 'Categoria' + requiredMessage]
                },
                unity: {type: String},
                amount: Number,
                manufacturer: String,
                observation: String
            }
        ],
    }]
}, {
    versionKey: false,
    toObject: {virtuals: true}
});

const Supplier = module.exports = mongoose.model('Supplier', supplier);

module.exports.getSupplierById = function(id, callback){
    Supplier.findById(id, callback);
}

