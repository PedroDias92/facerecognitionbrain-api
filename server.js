const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*  ENDPOINT's
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/

const saltRounds = 10;

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
  });
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  database.users.forEach(user => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  return res.status(404).json("no such user");
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  database.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  return res.status(404).json("no such user");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
