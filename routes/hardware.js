const express = require('express');
const router = express.Router();
const path = require('path');
const hardwareController = require("../controllers/hardwareController")

router.get( '/customers', hardwareController.getCustomers);
router.get('/items', hardwareController.getItems);
router.get( '/items/:id', hardwareController.getItemDetails);
router.get('/sales', hardwareController.getSales);
router.get('/customers/:id', hardwareController.getCustomerDetails);
router.delete('/customers/:id', hardwareController.deleteCustomer);
router.delete('/items/:id', hardwareController.deleteItem);
router.post('/items', hardwareController.postNewItem);
router.post('/customers', hardwareController.postNewCustomer);
router.get('/homepage', hardwareController.getHomePage);
router.put('/items/:id', hardwareController.postUpdatedItem);
router.put('/customers/:id', hardwareController.postUpdatedCustomer);

// router.get('/items/:id', hardwareController.getUpdatedItem);

// router.get('/showSales', hardwareController.getSales);
// router.get('/editCustomer/:cid', hardwareController.editCustomer);
// router.get('/addCustomer', hardwareController.getAddCustomer);
// router.post('/customer', hardwareController.postAddCustomer);
// router.get('/addItem', hardwareController.getAddItem);
// router.post('/item', hardwareController.postAddItem);
// router.post('/postUpdateCustomer', hardwareController.postUpdateCustomer);
// router.get('/home', hardwareController.getHomePage);

exports.routes = router;