const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//  Database
const User = require("../../models/user");

//  Keys
const secret = process.env.SECRET;

// @type    GET
//@route    /api/auth
// @desc    Registering a new user
// @access  PUBLIC
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(200).json({ email: false });
      } else {
        console.log(req.body);
        const newUser = new User({
          name: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            console.log(newUser)
            newUser
              .save()
              .then(user => console.log(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @type    GET
//@route    /api/auth
// @desc    Registering a new user
// @access  PUBLIC
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.password })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: false, password: false });
      } else {
        bcrypt.compare(req.body.password, user.password).then(isCorrect => {
          if (!isCorrect) {
            return res.status(404).json({ email: true, password: false });
          } else {
            const payload = { ...user };
            jwt.sign(payload,secret, {expiresIn: 3600},(err,token)=>{
                res.json({
                    email:true,
                    password:true,
                    token:"bearer " + token
                })
            })
          }
        }).catch(err=>{
            console.log(err)
            res.status(505).send("Internal Server Error");
        })
      }
    })
    .catch();
});

module.exports = router;
