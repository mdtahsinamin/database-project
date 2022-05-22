const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});
const schemas = {
  admins: `CREATE TABLE service (Id int NOT NULL AUTO_INCREMENT , email varchar(255) unique, PRIMARY KEY (ID)` ,
  service : `CREATE TABLE service (serviceId int NOT NULL AUTO_INCREMENT ,serviceTitle VARCHAR(255), description VARCHAR(255),image JSON,PRIMARY KEY (serviceId))` ,
  customers: `CREATE TABLE customers(customerId int NOT NULL AUTO_INCREMENT, name VARCHAR(255) , email VARCHAR(100), courseName VARCHAR(255), projectDetails VARCHAR(255), status VARCHAR(20),  image JSON, PRIMARY KEY (customerId))`,
  reviews: `CREATE TABLE reviews(reviewId int NOT NULL AUTO_INCREMENT, name VARCHAR(255) , companyName VARCHAR(100) ,description VARCHAR(255), photoUrl VARCHAR(2083) , PRIMARY KEY (reviewId))`
}

const db = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USERNAME}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
});



db.connect((err) =>{
    if (err) throw err;
    console.log("Connected!");
});
  

module.exports = db;


/*
db.query(schemas.customers, function (err, result) {
        if (err) throw err;
        console.log("Table created");
});

*/