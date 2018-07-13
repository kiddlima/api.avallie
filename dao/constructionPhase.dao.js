const ConstructionPhase = require('../schema/constructionPhase.schema');
const Promise = require('promise');

let dao = {};

dao.getPhaseById = getPhaseById;
dao.addConstructionPhases = addConstructionPhases;
dao.getPhaseByName = getPhaseByName;
dao.getAllPhases = getAllPhases;

module.exports = dao;

function addConstructionPhases(phases){
    return new Promise((resolve, reject) => {
        ConstructionPhase.insertMany(phases)
        .then((response) => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getPhaseByName(name){
    return new Promise((resolve, reject) => {
        ConstructionPhase.findOne({
            "name":  name
        })
        .then((phase) => {
            if(phase){
                resolve(phase);
            } else {
                reject("Fase não encontrada " + name);
            }
            
        })
        .catch((err) => {
            reject("Erro no banco de dados");
        })
    })
}

function getPhaseById(id){
    return new Promise((resolve, reject) => {
        ConstructionPhase.findOne({
            "_id": id
        })
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function getAllPhases(){
    return new Promise((resolve, reject) => {
        ConstructionPhase.find({})
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject("Erro no banco de dados");
        })
    })
}