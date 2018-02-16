const express = require('express');
const router = express.Router();
const supplierController = require('.././controller/supplier.controller');

router.get('/',function(req, res){
  res.send("Hello World!");
});

router.post('/addSupplier', supplierController.addSupplier);

module.exports = router;
