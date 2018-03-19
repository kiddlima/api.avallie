const mongoose = require('mongoose');

const requiredMessage = " é obrigatório";

let budgetRequest = new mongoose.Schema({
    status: { type: String, default: "Aguardando orçamento" },
    assinged_to: String,
    suppliers:[
        {
            id: String,
            status: {type: String, default: "Aguardando orçamento"},
            phones: [String],
            cnpj: String,
            fantasyName: String,
            responsable: String,
            phones: [String],
            emails: [String],
            city: [String],
            state: [String],
            cep: [String],
            address: [String],
            categories: [String],
            products: [
                {
                    _id: {type: String, required: [true, 'Id' + requiredMessage]},
                    name: {type: String, required: [true, 'Nome' + requiredMessage]},
                    category: {type: String, required: [true, 'Categoria' + requiredMessage]},
                    unity: {type: String},
                    amount: Number,
                    manufacturer: String,
                    observation: String,
                    budgets: [
                        {
                            brand: String,
                            price: Number,
                            observation: String
                        },
                    ]
                }
            ]
        },
    ],
    user: {
        email: {type: String, required: [true, 'Email' + requiredMessage]},
        name: {type: String, required: [true, 'Nome' + requiredMessage]},
        phone: {type: String, required: [true, 'Telefone' + requiredMessage]},
        cpf: {type: String, required: [true, 'CPF' + requiredMessage]}
    },
    address: {
        address: {type: String, required:[true, 'Endereço' + requiredMessage]},
        number: {type: Number, required: [true, 'Número' + requiredMessage]},
        city: {type: String, required: [true, 'Cidade' + requiredMessage]}
    },
    deadLine: {type: Date, required: [true, 'Prazo de entrega', requiredMessage]},
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('BudgetRequest', budgetRequest);