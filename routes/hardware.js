const express = require('express');
const router = express.Router();
const path = require('path');
const hardwareController = require("../controllers/hardwareController")

router.get( '/customers', hardwareController.getCustomers);
router.get('/items', hardwareController.getItems);
// router.get('/showSales', hardwareController.getSales);
// router.get('/editCustomer/:cid', hardwareController.editCustomer);
// router.get('/addCustomer', hardwareController.getAddCustomer);
// router.post('/customer', hardwareController.postAddCustomer);
// router.get('/addItem', hardwareController.getAddItem);
// router.post('/item', hardwareController.postAddItem);
// router.post('/postUpdateCustomer', hardwareController.postUpdateCustomer);
// router.get('/home', hardwareController.getHomePage);

exports.routes = router;