const express = require('express');
const router = express.Router();
const supplierController = require('.././controller/supplier.controller');
const categoryController = require('.././controller/category.controller');
const productController = require('.././controller/product.controller');
const budgetRequestController = require('.././controller/budgetRequest.controller');

router.get('/',function(req, res){
  res.send("Hello World!");
});

//SUPPLIER 
router.post('/addSupplier', supplierController.addSupplier);
router.post('/addSuppliers', supplierController.addSuppliers);

//PRODUTCS
router.post('/addProducts', productController.addProducts);
router.post('/getProducts', productController.getProducts);

//CATEGORIES
router.post('/addcategories', categoryController.addCategories);
router.get('/getCategory/:category', categoryController.getCategoryByName);
router.get('/getAllCategories', categoryController.getAllCategories);

//BUDGET REQUEST
router.post('/addBudgetRequest', budgetRequestController.addBudgetRequest);

module.exports = router;
