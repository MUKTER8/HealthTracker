const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()

// adding coors
app.use(cors())

// adding json support
app.use(express.json())

app.use(express.urlencoded({extended: true}))

// connecting to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cse02707388",
  database: "trackersystem"
})

// handling error when connecting
db.connect((err) => {
  if(err){
    console.log(err)
    return
  }
  console.log("databse connected")
})






// fetching data from databse


app.get('/information', (req, res) => {
  try {
    console.log("Endpoint hit: /information");  // Add this log

    const query = `SELECT * FROM info;`;
    
    db.query(query, (err, data) => {
      if(err){
        console.error("Query Error:", err);  // Log query error to the console
        res.json({status: 0, data: "could not get data"});
        return;
      }

      console.log("Data:", data); 
      res.json({ status: 1, data: data });
    });
  } catch (error) {
    console.error("Unexpected Error:", error);  // Log catch block error to the console
    res.json({ status: 0, data: "something went wrong" });
  }
});



// posting data to database

app.post("/userreg", (req, res) => {
  try {
    const query1 = `SELECT * FROM info WHERE email = ?`;

    const value1 = [req.body.email];

    db.query(query1, [value1], (err, response) => {
      if (err) throw err;

      if (response.length > 0) {
        // User credentials are valid
        res.json({ status: 0, data: "You are already Registerd" });
      } else {
        // user with same username don't exist. so we do the rest work (create user)
        const query = "INSERT INTO `info` (`email`, `name`, `password`, `age`, `division`, `gender`) VALUES (?)"

    const values = [req.body.email, req.body.name, req.body.password, req.body.age, req.body.division, req.body.gender]

        db.query(query, [values], (err, data) => {
          console.log(err);
          if (err) {
            res.json({ status: 0, data: "could not create account" });
            return;
          }
          res.json({ status: 1, data: "account created" });
        });
      }
    });
  } catch (error) {
    res.json({ status: 0, data: "something went wrong" });
  }
});

app.post("/userlog", (req, res) => {
  try {
    const { email,password } = req.body;

    const query = `SELECT email,name,gender,age,division FROM info WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        // User credentials are valid
        res.json({ status: 1, data: results[0] });
      } else {
        // Invalid credentials
        res.json({ status: 0, data: "Invalid Password" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 0, data: "something went wrong" });
  }
});

module.exports = app