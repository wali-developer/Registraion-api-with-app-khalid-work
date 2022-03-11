const express = require("express");
const Route = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

Route.post("/register", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send("Already registered user");
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    const createUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      work: req.body.work,
    });
    res.json(`User ${createUser.name} Registered successfully`);
  } catch (error) {
    return res.send(error);
  }
});

// now login route
Route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill the fields" });
    }
    let userlogin = await User.findOne({ email: email });

    if (!userlogin) {
      return res
        .status(422)
        .json({ error: "Please your credientials are wrong" });
    } else {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      if (isMatch) {
        const token = jwt.sign(
          { _id: userlogin._id, iat: Date.now() },
          process.env.SECRET
        );

        res.send(token);
      } else {
        res.send("Invalid Password...");
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = Route;

// Errors:
// 1. jwt was not imported
// 2. use of undefined authorization function
// 3. Model was incorrect exported
// 4. token was created wrong
