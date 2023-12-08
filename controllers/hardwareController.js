const Customer = require ("../models/customer");
const Item = require("../models/item");
const Sale = require ("../models/sale")


exports.getCustomers = (req, res, next) => {
    Customer.fetchAll()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            res.status(200).json( rows[0]);
        })
}
exports.getItems = (req, res, next) => {
    Item.runItemQuery()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            res.status(200).json( rows[0]);
        })
}
exports.getItemDetails = ( req, res, next ) => {
    let id = req.params.id;
    console.log('getitemdetails controller');
    console.log(id);
    // fetch all the records and find the idth one
    Item.findById(id)
        .then ((rows, fieldData) =>{
            console.log("ROWS get item details =>");
            res.status(200).json( rows[0][0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.getCustomerDetails = ( req, res, next ) => {
    let id = req.params.id;
    console.log('getcustomerdetails controller');
    console.log(id);
    // fetch all the records and find the idth one
    Customer.findById(id)
        .then ((rows, fieldData) =>{
            console.log("ROWS get customer details =>");
            res.status(200).json( rows[0][0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.getSales = (req, res, next) => {
    Sale.runSaleQuery()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            res.status(200).json( rows[0]);
        })
}
exports.deleteCustomer = (req, res, next) => {
    Customer.delete(req.params.id)
        .then(() => {
            res.json({message: 'Customer deleted succesfully'});
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err.message});
    })
}
exports.deleteItem = (req, res, next) => {
    Item.delete(req.params.id)
        .then(() => {
            res.json({message: 'Item deleted '});
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err.message});
    })
}
exports.postNewItem = (req, res, next) => {
    let name = req.body.ItemName;
    let price = req.body.ItemPrice;
    let id = Item.count() + 1;
    const item = new Item(id, name, price);
    item.save()
        .then(() => {
            res.status(200).json({message: 'Item added '})
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: `Failed to add item; ${err.message}`})
    })
}
exports.postNewCustomer = (req, res, next) => {
    let name = req.body.CustomerName;
    let email = req.body.CustomerEmail;
    let id = Customer.count() + 1;
    const customer = new Customer(id, name, email);
    customer.save()
        .then(() => {
            res.status(200).json({message: 'Customer added '})
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: `Failed to add customer; ${err.message}`})
    })
}

exports.getHomePage = (req,res, next) => {
    let topCustomers, topItems, topSales;
    Customer.runTop5CustomerQuery().then(([customerData]) => {
        topCustomers = customerData;
        return Item.runTop5ItemQuery();
    }).then(([itemData]) => {
        topItems = itemData;
        return Sale.runTopSalesQuery();
    }).then(([saleData]) => {
        topSales = saleData;
        res.json({
            customer: topCustomers,
            items: topItems,
            sales: topSales
        })
    }).catch(err => {
        console.log('No Home Page');
        console.log(err);
        res.status(500).json({error: `Failed to add customer; ${err.message}`})
    })
}
exports.postUpdatedItem = (req, res, next) => {
    let id = req.params.id
    let name = req.body.ItemName;
    let price = req.body.ItemPrice;
    const item = new Item(id, name, price);
    item.update()
        .then(() => {
            res.status(200).json({message: 'item updated '});
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: `Failed to update item; ${err.message}`});
    });
}
exports.postUpdatedCustomer = (req, res, next) => {
    let id = req.params.id;
    let name = req.body.CustomerName;
    let email = req.body.CustomerEmail;
    const customer = new Customer(id, name, email);
    console.log("in postupdatedcustomer:" + id)
    customer.update()
        .then(() => {
            res.status(200).json({message: 'customer updated '});
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: `Failed to update customer; ${err.message}`});
    });
}
