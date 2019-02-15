const mongoose = require('mongoose');

const requiredMessage = ' é obrigatório.';

let supplier = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email' + requiredMessage]
    },
    password: {
        type: String,
        required: [true, 'Senha' + requiredMessage],
        select: false
    },
    cnpj: {
        type: String,
        required: [true, 'CNPJ' + requiredMessage]
    },
    supplierName: {
        type: String,
        required: [true, 'Nome do fornecedor' + requiredMessage]
    },
    phone: {
        type: [String],
        required: [true, 'Telefone' + requiredMessage]
    },
    city: {
        type: [String],
        required: [true, 'Cidade' + requiredMessage]
    },
    state: {
        type: [String],
        required: [true, 'Estado' + requiredMessage]
    },
    cep: {
        type: [String],
        required: [true, 'CEP' + requiredMessage]
    },
    address: {
        type: [String],
        required: [true, 'Endereço' + requiredMessage]
    },
    url: [String],
    categories: {
        type: [String],
        required: [true, 'Categoria' + requiredMessage]
    },
    budgetRequests: [{
        budgetRequest_id: String,
        user: {
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
        products: [
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
                unity: { type: String },
                amount: Number,
                manufacturer: String,
                observation: String
            }
        ],
    }]
}, {
        versionKey: false,
        toObject: { virtuals: true }
    });

const Supplier = module.exports = mongoose.model('Supplier', supplier);

module.exports.getSupplierById = function (id, callback) {
    Supplier.findById(id, callback);
}

