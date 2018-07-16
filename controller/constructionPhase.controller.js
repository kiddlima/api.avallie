const constructionPhaseService = require('.././service/constructionPhase.service');

let controller = {}

controller.getPhaseByName = getPhaseByName;
controller.addPhases = addPhases;
controller.getAllPhases = getAllPhases;

module.exports = controller;

function addPhases(req, res, next){
    constructionPhaseService.addPhases(req.body)
    .then((result) => {
        res.status(200);
        res.json(result);
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
    })
}

function getPhaseByName(req, res, next){
    constructionPhaseService.getPhaseByName(req.params.phase)
    .then((phase) => {
        res.status(200);
        res.json(phase);
    })
    .catch((err) => {
        res.status(400);
        res.json(err);
    })
}

function getAllPhases(req, res, next){
    constructionPhaseService.getAllPhases()
    .then((phases) => {
        res.status(200);
        res.json(phases)
    })
    .catch((err) => {
        res.status(400);
        res.json(err)
    })
}

