require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mysqlPool = require("./Config/db");
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());

// getUsersInfo
app.get("/info/users", (req, res) => {
  mysqlPool
    .query("SELECT * FROM users")
    .then(([rows]) => res.send(rows))
    .catch((err) => console.log(err));
});

app.post("/post/users-info", (req, res) => {
  const user = req.body;
  console.log(user);
  mysqlPool
    .query("INSERT INTO users SET ?", user)
    .then(([rows]) => res.send(rows))
    .catch((err) => console.log(err));
});
app.delete("/delete/users/:id", (req, res) => {
  const id = req.params.id;
  mysqlPool
    .query("DELETE FROM users WHERE id = ?", [id])
    .then(([rows]) => res.send(rows))
    .catch((err) => console.log(err));
});

// route?
app.get("/", (req, res) => {
  res.send("Hello Webiners!");
  console.log("Hello Webiners!");
});
// conditionaly Listen
mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("mysql connected");
    // listen;
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((err) => console.log(err));
