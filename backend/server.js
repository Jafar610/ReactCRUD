const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.listen(3002, (err) => {
  if (err) throw err;
  console.log("Server is running on " + "http://localhost:3002");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM students WHERE id = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Student deleted successfully" });
    },
  );
});

app.post("/add", uploads.single("image"), (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const image = req.file.filename;
  connection.query(
    "INSERT INTO students (name, email, age, image) VALUES (?, ?, ?, ?)",
    [name, email, age, image],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Student added successfully" });
    },
  );
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    },
  );
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;
  connection.query(
    "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
    [name, email, age, id],
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Student updated successfully" });
    },
  );
});
