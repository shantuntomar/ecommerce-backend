var mysql = require("mysql");
var pool = mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'root',
        database:'restaurant',
        connectionLimit:100,
        multipleStatements:true
    }
)
module.exports=pool; //acessible over the node programm 




