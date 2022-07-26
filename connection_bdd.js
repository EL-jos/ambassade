const mysql = require("mysql");
let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

const db = mysql.createConnection({
    host: "",
    
    user: "espma_EL-jos",
    password: "Elongajosue22",
    database: "ambassade"
});

db.connect((error) => {
    if(error){
        throw error;
    }

    console.log("MySql connected...");
});

module.exports = db;