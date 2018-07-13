const express = require('express');
const router = express.Router();
const supplierController = require('.././controller/supplier.controller');
const constructionPhaseController = require('.././controller/constructionPhase.controller');
const productController = require('.././controller/product.controller');
const budgetRequestController = require('.././controller/budgetRequest.controller');

router.get('/',function(req, res){
  res.send("Hello World!");
});

//SUPPLIER 
// ROTAS COMENTADAS POR SEGURANCA
router.post('/addSupplier', supplierController.addSupplier);
router.post('/addSuppliers', supplierController.addSuppliers);

//PRODUTCS
// ROTAS COMENTADAS POR SEGURANCA
router.post('/addProducts', productController.addProducts);
router.post('/getProducts', productController.getProducts);

//CONSTRUCTION PHASES
// ROTAS COMENTADAS POR SEGURANCA
router.post('/addPhases', constructionPhaseController.addPhases);
router.get('/getPhase/:phase', constructionPhaseController.getPhaseByName);
router.get('/getAllPhases', constructionPhaseController.getAllPhases);

//BUDGET REQUEST
router.post('/addBudgetRequest', budgetRequestController.addBudgetRequest);
router.get('/getBudgetRequests', budgetRequestController.getBudgetRequests);
router.patch("/updateBudgetRequest/:id", budgetRequestController.updateBudgetRequest);
router.patch("/updateSupplierStatus", budgetRequestController.updateSupplierStatus);
router.put("/updateProductBudget", budgetRequestController.updateProductBudget);

//AUTH
router.post("/admin/login", (req, res, next) => {
  switch(req.body.password){
    case("allanAvallieAdmin"):
      res.status(200);
      res.json({name: "Allan"})
      break;
    case("caueAvallieAdmin"):
      res.status(200);
      res.json({name: "Caue"})
      break;
    case("joaoAvallieAdmin"):
      res.status(200);
      res.json({name: "Joao"})
      break;
    case("viniAvallieAdmin"):
      res.status(200);
      res.json({name: "Vinicius"})
      break;
    case("cassiAvallieAdmin"):
      res.status(200);
      res.json({name: "Cassiano"})
      break;
    default:
      res.status(400);
      res.json(false);
  }
})

module.exports = router;
