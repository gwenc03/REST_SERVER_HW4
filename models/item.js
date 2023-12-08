const db = require("../util/database");

module.exports = class Item {
    constructor(iid, name, price) {
        this.ItemID = iid;
        this.ItemName = name;
        this.ItemPrice = price;
    }

    save() {
        return db.execute('insert into Item (ItemID, ItemName, ItemPrice) ' +
            'values (?, ?, ?)',
            [this.ItemID, this.ItemName, this.ItemPrice]
        )
    }

    //
    static delete(iid) {
        return db.execute("delete from Item where ItemID = ?",
            [iid]
        )
    }

    update (){
        return db.execute( "UPDATE item SET ItemName = ?, ItemPrice = ?  WHERE ItemID = ?",
            [this.ItemName, this.ItemPrice, this.ItemID] );
    }

    static fetchAll() {
        return db.execute("select * from Item");
    }

    static count(){
        return db.execute('select count(*) from Item');
    }
    static findById(iid) {
        return db.execute("select * from Item where ItemID = ?",
            [iid]);
    }
    static runItemQuery(){
        return db.execute("select i.ItemID, i.ItemName, SUM(i.ItemPrice * s.Quantity) AS TotalSales" +
            " FROM Item i" +
            " Left JOIN Sales s ON s.ItemID = i.ItemID" +
            " GROUP BY i.ItemID" +
            " order by TotalSales DESC")
    }
    static runTop5ItemQuery(){
        return db.execute("select i.ItemName, SUM(i.ItemPrice * s.Quantity) AS TotalSales" +
            " FROM Item i" +
            " Left JOIN Sales s ON s.ItemID = i.ItemID" +
            " GROUP BY i.ItemID" +
            " order by TotalSales DESC" +
            " Limit 5")
    }
}