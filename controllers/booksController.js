const Book = require("../models/book");
// let Books = [];

exports.getBooks = ( req, res, next ) => {
    Book.fetchAll()
        .then(( rows, fieldData ) => {
            console.log( "ROws="); console.log( rows );
            // res.send( "Is seems ok ");
            // res.send( "Is seems ok ");
            res.status(200).json( rows[0]);

        })
 }

exports.getBookDetails = ( req, res, next ) => {
    let id = req.params.id;
    // fetch all the records and find the idth one
    Book.findById(id)
        .then ((rows, fieldData) =>{
            console.log("ROWS=>");
            res.status(200).json( rows[0][0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}

exports.postAddBook = (req, res, next) => {
    console.log( "FL0->"); console.log( req.body );
    let t = req.body.title;
    let a = req.body.author;
    let p = req.body.price;
    let d = req.body.description;

    let obj = { t, a, p, d};
    console.log( "FL1"); console.log( obj );
    // res.status(200).json( obj );
    const book = new Book( t, a, p );
    book.save();
    // res.redirect("/showAdmin");
}
