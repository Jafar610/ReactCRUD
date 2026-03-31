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

app.delete("/delete/:id", (req, res)=>{
    const {id} = req.params;
   
    connection.query("DELETE FROM students WHERE id = ?", [id], (err, results)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json({msg: "Student deleted successfully"});
        }
    })
})


app.put("/update/:id", (req, res)=>{
    const {id} = req.params;
    const {name, email, age} = req.body;
    console.log(id);
    connection.query("UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?", [name, email, age, id], (err, results)=>{
        if(err){
            res.json({err: err});
            console.log(err);
        
        }else{
            res.json({msg: "Student updated successfully"});
        }
    })
})

app.get("/student/:id", (req, res)=>{
    const {id} = req.params;
    connection.query("SELECT * FROM students WHERE id = ?", [id], (err, results)=>{
        if(err){
            res.json({err: err});
        }
        else{
            res.json(results);
        }
    })
})





app.listen(3001, () => {
  console.log("Server running on " + 'http://localhost:3001');
});
