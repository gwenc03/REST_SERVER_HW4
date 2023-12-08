const express = require('express');
const router = express.Router();
const path = require('path');
const hardwareController = require("../controllers/hardwareController")

router.get( '/customers', hardwareController.getCustomers);
router.get('/customers/:id', hardwareController.getCustomerDetails);
router.put('/customers/:id', hardwareController.postUpdatedCustomer);
router.delete('/customers/:id', hardwareController.deleteCustomer);
router.post('/customers', hardwareController.postNewCustomer);

router.get('/items', hardwareController.getItems);
router.get( '/items/:id', hardwareController.getItemDetails);
router.put('/items/:id', hardwareController.postUpdatedItem);
router.delete('/items/:id', hardwareController.deleteItem);
router.post('/items', hardwareController.postNewItem);

router.get('/sales', hardwareController.getSales);

router.get('/homepage', hardwareController.getHomePage);


exports.routes = router;