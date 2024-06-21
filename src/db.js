// db.js

const {Pool} = require("pg");

const pool = new Pool({
  // host: '13.202.102.31',
  host: "13.202.87.221",
  user: "postgres",
  // database: ''+db_name+'',
  database: "db",
  password: "1234",
  //  password: process.env.db_password,
  port: 5432,
});
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    return;
  }
  console.log("Connected to database");
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};
