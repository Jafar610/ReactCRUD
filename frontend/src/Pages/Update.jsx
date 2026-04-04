import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [image, setImage] = useState(null);

  const id = useParams().id;
  const navigate = useNavigate();

  const changeHandling = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/" + id)
      .then((res) => {
        setStudent(res.data[0]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("There is an error" + err);
      });
  }, []);

  const submitHandling = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("age", student.age);

    if (image) {
      formData.append("image", image);
    }
    axios
      .put("http://localhost:3002/update/" + id, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Update Student</h1>

      <form onSubmit={submitHandling}>
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={changeHandling}
        />
        <br />
        <input
          type="email"
          name="email"
          value={student.email}
          placeholder="Email"
          onChange={changeHandling}
        />
        <br />
        <input
          type="number"
          name="age"
          value={student.age}
          placeholder="Age"
          onChange={changeHandling}
        />
        <br />
        <input
          type="file"
          name="image"
          id=""
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default Update;
