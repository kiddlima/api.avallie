const Promise = require('promise');
const dao = require('../dao/constructionPhase.dao');
const apiHelper = require('../helper/api.helper')

let service = {};

service.getPhaseByName = getPhaseByName;
service.addPhases = addPhases;
service.getAllPhases = getAllPhases;

module.exports = service;

function addPhases(phases){
    return new Promise((resolve, reject) => {
        dao.addConstructionPhases(phases)
        .then((result) => {
            resolve(apiHelper.buildResponseMessage(200, "Fases cadastradas com sucesso"))
        })
        .catch((err) => {
            let error = err.errors;
            reject(apiHelper.buildResponseMessage(400, error[Object.keys(error)[0]].properties.message));
        })
    })
}

function getPhaseByName(name){
    return new Promise((resolve, reject) => {
        dao.getPhaseByName(name)
        .then((phase) => {
            resolve(phase);
        })
        .catch((err)=> {
            reject(apiHelper.buildResponseMessage(400, err));
        })
    })
}

function getAllPhases(){
    return new Promise((resolve, reject) => {
        dao.getAllPhases()
        .then((phases) => {
            resolve(phases);
        })
        .catch((err) => {
            reject(apiHelper.buildResponseMessage(400, err));
        })
    })
}