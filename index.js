const express = require("express");
const cors = require("cors");
const { User } = require("./src/user");  // Adjust path as necessary
const app = express();

const UserWithDb = new User();
app.use(express.json());
app.use(cors());

app.post("/api/v1/users/postQuery", (req, res) => {
  UserWithDb.postQuery(req, res);
});

app.post("/api/v1/users/getQuery", (req, res) => {
  UserWithDb.getQuery(req, res);
});

app.get("/api/v1/users/getQuery/employee", (req, res) => {
  UserWithDb.getemployee(req, res);
});

app.post("/api/v1/users/getQuery/employee/automatedTask", (req, res) => {
  UserWithDb.automatedTask(req, res);
});

app.post("/api/v1/users/getQuery/login", (req, res) => {
  UserWithDb.adminLogin(req, res);
});

app.post("/api/v1/users/getQuery/emplogin", (req, res) => {
  UserWithDb.empLogin(req, res);
});

app.post("/api/v1/users/getQuery/updateemplogin", (req, res) => {
  UserWithDb.updateempLogin(req, res);
});

app.post("/api/v1/users/getQuery/employee/updateattendancepunchin/:id", (req, res) => {
  UserWithDb.updateattendancepunchin(req, res);
});

app.post("/api/v1/users/getQuery/employee/updateattendancepunchout/:id", (req, res) => {
  UserWithDb.updateattendancepunchout(req, res);
});

app.get("/api/v1/users/getQuery/employee/task/:id", (req, res) => {
  UserWithDb.getemployeeattendance(req, res);
});

module.exports = app;
