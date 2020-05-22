// get the client
const mysql = require('mysql2/promise');
 
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: '34.71.138.115',
    user: 'mikearchila',
    password: 'Mariobross5625.',
    database: 'mandaditos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



// For pool initialization, see above
// pool.query("SELECT * FROM usuario", function(err, rows, fields) {
//    console.log(rows);
//  })
 


module.exports = pool;