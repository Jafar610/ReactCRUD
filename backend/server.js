const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

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

app.get( "/", (req, res) => {
    connection.query("SELECT * FROM students", (err, results)=>{
        if(err){
            res.json({err: err});
        }
        else{
            res.json(results);
        }
    })
})

app.post("/add", (req, res)=>{
    const {name, email, age} = req.body;
    connection.query("INSERT INTO students (name, email, age) VALUES (?, ?, ?)",
        [name, email, age], (err, results)=>{
            if(err){
                res.json({err: err});
            }
            else{
                res.json({msg: "Student added successfully"});
            }
        }
    )
})




app.listen(3001, () => {
  console.log("Server running on " + 'http://localhost:3001');
});
