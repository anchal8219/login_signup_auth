const express = require("express");
var mysql = require('mysql2');
require('dotenv').config();
const app = express();

const result = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "sfgf",
            database:"hell",
            sockertPath: '/var/run/mysqld/mysqld.sock'
    });
 
//     result.connect()

//     result.query('SELECT 1 + 1 AS solution',
//     function (error, results, fields) {
//    if (error) throw error;
//    console.log('The solution is: ', results[0].
//      solution)
//    });    

module.exports = result;