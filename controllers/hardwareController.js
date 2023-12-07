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
    console.log('getitemdetails controller')
    console.log(id)
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
// exports.getUpdatedItem = ( req, res, next ) => {
//     let id = req.params.id;
//     console.log('in update item')
//     Item.findById(id)
//         .then ((rows, ) => {
//             console.log("ROWS get updated item =>");
//             res.status(200).json( rows[0][0]);
//         }).catch( err => {
//         console.log("DB Error=>");
//         console.log(err);
//     })
// }
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