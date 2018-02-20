const express = require('express');
const router = express.Router();
const supplierController = require('.././controller/supplier.controller');
const categoryController = require('.././controller/category.controller');
const productController = require('.././controller/product.controller');

router.get('/',function(req, res){
  res.send("Hello World!");
});

router.post('/addSupplier', supplierController.addSupplier);
router.post('/addcategories', categoryController.addcategories);
router.post('/addProducts', productController.addProducts);
router.post('/addSuppliers', supplierController.addSuppliers);

module.exports = router;
