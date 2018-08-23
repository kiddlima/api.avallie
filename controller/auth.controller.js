const authService = require('../service/auth.service');

module.exports = {
    registerSupplier: registerSupplier,
    authenticateSupplier: authenticateSupplier
};

function registerSupplier(req, res, next){
    console.log("REGISTER SUPPLIER");
    authService.registerSupplier(req.body)
    .then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    })
}

function authenticateSupplier(req, res, next){
    authService.authenticateSupplier(req.body)
    .then((result) => {
        res.status(200);
        res.send(result);
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    })
}