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
            res.status(200).json( rows[0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
