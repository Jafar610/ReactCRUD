const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_db"
});

connection.connect((err)=>{
    if(err){
        console.error("Error connecting to database:", err);
    }
    else{
        console.log("Connected to database");
    }
})





app.listen(3001, () => {
  console.log("Server running on port 3001");
});
