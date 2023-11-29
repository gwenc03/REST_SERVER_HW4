const mysql = require("mysql2");


// Create a connection pool

const pool = mysql.createPool({
    // host : 'localhost',
    host : '45.55.136.114',
    user : 'F2023_tcanos01',
    // database : 'node-complete',
    database : 'F2023_tcanos01',
    password: "alligator23!"
});

module.exports = pool.promise();
module.exports = pool.promise();