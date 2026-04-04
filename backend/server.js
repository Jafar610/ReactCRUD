const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_db'
});

connection.connect((err)=>{
  if(err) throw err;
  console.log('Connected to MySQL database');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

app.post('/add', upload.single('image'), (req, res)=>{
    const {name, email, age} = req.body;
    const image = req.file ? req.file.filename : null;

    connection.query('INSERT INTO students (name, email, age, image) VALUES (?, ?, ?, ?)', [name, email, age, image], (err, results)=>{
      if(err) throw err;
      res.send('Student added successfully');
    })
})

app.get('/', (req, res)=>{
  connection.query('SELECT * FROM students', (err, results)=>{
    if(err) throw err;
    res.json(results);
  })
})


app.get('/:id', (req, res)=>{
  const id = req.params.id;
  connection.query('SELECT * FROM students WHERE id = ? ', [id], (err, results)=>{
    if(err) throw err;
    res.json(results);
  })
})


app.put('/update/:id', upload.single("image"), (req, res)=>{
   const id = req.params.id;
   const {name, email, age} = req.body;

   if(req.file){
    const image =req.file ? req.file.filename : null;
    console.log(image);
    
    connection.query('UPDATE students SET name = ?, email = ?, age = ?, image = ? WHERE id = ? ', [name, email, age, image, id], (err, results)=>{
      if(err) throw err;
      res.json("Update with new images");
    })
   }

   else{
    connection.query('UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], (err, results)=>{
      if(err) throw err;
      res.json("Updated without changing the images");
    })
   }
})



app.listen(3002, () =>{
    console.log('Server is running on port ' + 'http://localhost:3002');
})