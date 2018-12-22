<<<<<<< HEAD
if(!process.env.port)
  require("dotenv").config();
=======
>>>>>>> c733baa8f4e42be2405d086e77c6cf20d7ee19c8
// HERE: Packages
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// HERE: Constants
const port = process.env.PORT || 3000;
const public = path.join(__dirname, "public");


// HERE: Middlewear Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(public));
app.use(cookieParser());

// HERE: Importing Routes
const auth = require("./routes/public/login");

//Connecting Database
mongoose
  .connect(process.env.DB_URL,{ useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// @type    GET
//@route    /
// @desc    Home Page
// @access  PUBLIC
app.get("/", (req, res) => {
  res.status(200).semdFile(path.join(public, "index.html"));
});

app.get("/authenticate",(req,res)=>{
    res.status(200).sendFile(path.join(public, "login.html"));
})
app.use("/authenticate",auth);



app.listen(port, ()=>console.log("server Running on port "+port))
