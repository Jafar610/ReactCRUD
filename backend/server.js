const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db'
});

connection.connect((err) =>{
    if(err) throw err;
    console.log('Connected to database');
});

app.get('/', (req, res)=>{
    connection.query('SELECT * FROM students', (err, results)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.post('/add', (req, res)=>{
    const {name, email, age} = req.body;
    connection.query('INSERT INTO students (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results)=>{
        if(err) throw err;
        res.json({message: 'Student added successfully'});
    })
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    connection.query('DELETE FROM students WHERE id = ?', [id], (err, results)=>{
        if(err) throw err;
        res.json({message: 'Student deleted successfully'});
    })
})




app.listen(3001, () =>{
  console.log('Server is running on port ' + 'http://localhost:3001');
})