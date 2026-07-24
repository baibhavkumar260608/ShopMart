const mysql = require("mysql2");

const pool = mysql.createPool({

    host: process.env.MYSQL_HOST,

    user: process.env.MYSQL_USER,

    password: process.env.MYSQL_PASSWORD,

    database: process.env.MYSQL_DATABASE,

    port: Number(process.env.MYSQL_PORT),

    ssl:{
        rejectUnauthorized:false
    },

    waitForConnections:true,

    connectionLimit:10,

    queueLimit:0

});


pool.getConnection((err, connection)=>{

    if(err)
    {
        console.log("DATABASE CONNECTION ERROR:");
        console.log(err);
    }
    else
    {
        console.log("DATABASE CONNECTED");
        connection.release();
    }

});


module.exports = pool;
