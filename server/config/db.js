import mysql from "mysql";

const db = mysql.createPool({
    host : 'http://ip0131.cafe24.com/pma/',
    user : 'ip0131',
    password : 'ip0131132',
    database : 'ip0131'
});

module.exports = db;