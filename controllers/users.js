require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

//API for User login

const loginUser = async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });
  if (user) {
    const payload = { _id: user._id };
    const cookie_token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie("jwt", cookie_token, {
      secure: true,
      expires: new Date(Date.now() + 10800),
      httpOnly: false,
    });
    if (password == user.password) {
      res.status(200).json({ msg: "Logeed in", jwt_token: cookie_token });
    } else {
      res.status(200).json({ msg: "password not matched" });
    }
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};

//API for New User Registration

const registerUser = async (req, res) => {
  const { name, email, password ,id} = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: 'User is already registered' });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
      id:id
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};



module.exports = { loginUser, registerUser};