const db = require("../util/database");

module.exports = class Sales {
    constructor(sid, cid, iid, quantity, salesdate) {
        this.SalesID = sid;
        this.CustomerID = cid;
        this.ItemID = iid;
        this.Quantity = quantity;
        this.SalesDate = salesdate;
    }

    save() {
        return db.execute('insert into sales (sid, cid, iid, quantity, salesdate) ' +
            'values (?, ?, ?, ?, ?)',
            [this.SalesID, this.CustomerID, this.ItemID, this.Quantity, this.SalesDate]
        )
    }

    static delete(cid) {
        return db.execute("delete from Sales where cid = ?",
            [cid]
        )
    }

    static fetchAll() {
        return db.execute("select * from Sales");
    }

    static findById(cid) {
        return db.execute("select * from Sales where cid = ?",
            [cid]);
    }

    static runSaleQuery() {
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%Y-%m-%d') AS Date," +
            " c.CustomerName," +
            " i.ItemName AS Product," +
            " s.Quantity AS Quantity," +
            " (i.ItemPrice * s.Quantity) AS TotalSales" +
            " FROM Sales s JOIN Customer c ON s.CustomerID = c.CustomerID" +
            " JOIN Item i ON s.ItemID = i.ItemID" +
            " WHERE MONTH(s.SalesDate) = MONTH(CURDATE()) AND YEAR(s.SalesDate) = YEAR(CURDATE())" +
            " ORDER BY TotalSales DESC")
    }
    static runTopSalesQuery() {
        return db.execute("SELECT" +
            " DATE_FORMAT(SalesDate, '%Y-%m') AS Month," +
            " SUM(Quantity * ItemPrice) AS TotalSales" +
            " FROM Sales" +
            " JOIN Item ON Sales.ItemID = Item.ItemID" +
            " WHERE SalesDate >= DATE_FORMAT(NOW(), '%Y-%m-01') - INTERVAL 5 MONTH" +
            " GROUP BY DATE_FORMAT(SalesDate, '%Y-%m')" +
            " ORDER BY TotalSales DESC" +
            " limit 5;")
    }
}