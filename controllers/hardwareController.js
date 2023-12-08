const Customer = require ("../models/customer");
const Item = require("../models/item");
const Sale = require ("../models/sale")

// exports.getAddCustomer = ( req, res, next) => {
//     res.render( 'hardware/addCustomer',
//         {
//             from: 'addCustomer'
//         })
// }
// exports.getAddItem = ( req, res, next) => {
//     res.render( 'hardware/addItem',
//         {
//             from: 'addItem'
//         })
// }
// exports.postAddItem = ( req, res, next) => {
//     let name = req.body.name;
//     let price = req.body.price;
//     let iid = Item.count() + 1;
//     const item = new Item(iid, name, price);
//     item.save();
//     res.redirect('/showItems');
// }
// exports.postAddCustomer = ( req, res, next) => {
//     let name = req.body.name;
//     let email = req.body.email;
//     let cid = Customer.count() + 1;
//     const customer = new Customer(cid, name, email);
//     customer.save();
//     res.redirect('/showCustomers');
// }
exports.getCustomers = (req, res, next) => {
    // Customer.runCustomerQuery()
    Customer.fetchAll()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            // res.render("hardware/showCustomersAdmin", {
            //     title: "Customer Info",
            //     from: "showCustomers",
            //     customers: rows[0]
            // })
            res.status(200).json( rows[0]);
        })
}
exports.getItems = (req, res, next) => {
    // Item.runItemQuery()
    Item.runItemQuery()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            // res.render("hardware/showItemAdmin", {
            //     title: "Item Info",
            //     from: "showItems",
            //     items: rows[0]
            // })
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
    // Item.runItemQuery()
    Sale.runSaleQuery()
        .then((rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            // res.render("hardware/showItemAdmin", {
            //     title: "Item Info",
            //     from: "showItems",
            //     items: rows[0]
            // })
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
    let id = req.body.ItemID;
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
    let id = req.body.CustomerID;
    let name = req.body.CustomerName;
    let email = req.boyd.CustomerEmail;
    const customer = new Customer(id, name, email);
    customer.update()
        .then(() => {
            res.status(200).json({message: 'customer updated '});
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: `Failed to update customer; ${err.message}`});
    });
}
//
// exports.getSales = (req, res, next) => {
//     Sale.runSaleQuery()
//         .then((rows, fieldData ) => {
//             res.render("hardware/showSalesAdmin", {
//                 title: "Sales Info",
//                 from: "showSales",
//                 sales: rows[0]
//             })
//         })
// }
//
// exports.editCustomer = ( req, res, next ) => {
//     let id = req.params.cid;
//     Customer.findById(id)
//         .then ((rows, fieldData) =>{
//             res.render( 'hardware/ShowUpdateForm', {
//                 title : `Update record:${id} `,
//                 id : rows[0].id,
//                 from: 'updateProducts',
//                 customer: rows[0][0]
//             })
//         }).catch( err => {
//         console.log( "DB Error=>");
//         console.log( err );
//     })
// }
//
// exports.postUpdateCustomer = ( req, res, next ) => {
//     let id = req.body.CustomerID;
//     let name = req.body.CustomerName;
//     let email = req.body.CustomerEmail;
//     const customer = new Customer(id, name, email);
//     customer.update(id).then((rows, fieldData) => {
//         res.redirect('/showCustomers')
//     }).catch(err => {
//         console.log('WTH');
//         console.log(err);
//     })
// }
//
// exports.getHomePage = ( req, res, next) => {
//     let topCustomers, topItems, topSales;
//     Customer.runTop5CustomerQuery().then(([customerData]) => {
//         topCustomers = customerData;
//         return Item.runTop5ItemQuery();
//     }).then(([itemData]) => {
//         topItems = itemData;
//         return Sale.runTopSalesQuery();
//     }).then(([saleData]) => {
//         topSales = saleData;
//         res.render("hardware/home", {
//             from: "home",
//             customer: topCustomers,
//             item: topItems,
//             sale: topSales
//         })
//     }).catch(err => {
//         console.log('No Home Page');
//         console.log(err);
//     })
// }