const db = require("../util/database");

module.exports = class Book {
    constructor( t, a, price ) {
        this.title = t;
        this.author = a;
        this.price = price;
        this.description = "It was good it was bad it was ugly";
    }
    save() {
            return db.execute( 'insert into books (title, price, author, description) ' +
                'values (?, ?, ?, ?)',
                [this.title, this.price, this.author, this.description]
            )
    }
    static delete( id ) {
        return db.execute( "delete from books where id = ?",
            [id]
        )
    }
    static fetchAll(){
      return db.execute( "select * from books");
    }
    static findById( id ){
        return db.execute( "select * from books where id = ?",
            [id] );
    }
    update ( id ){
        return db.execute( "UPDATE books SET price = ?, author = ?, title= ?  WHERE id = ?",
            [this.price, this.author, this.title, id ] );
    }
}