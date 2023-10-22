require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

//API for User login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // const match_password=await bcrypt.compare(password,user.password)
    const payload = { _id: user._id };
    const cookie_token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie("jwt", cookie_token, {
      secure: true,
      expires: new Date(Date.now() + 10800),
      httpOnly: false,
    });
    if (password == user.password) {
      res.status(200).json({ msg: "Logeed in", jwt_token: cookie_token,id:user._id });
    } else {
      res.status(200).json({ msg: "password not matched" });
    }
  } else {
    res.status(200).json({ msg: "Not User" });
  }
};

//API for New User Registration

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists in the database
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: 'User is already registered' });
    }

    // If the user doesn't exist, create a new user
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const addFriend=async (req,res)=>{
  // console.log(req.body)
     const {id,friend_id}=req.body;

     try{
       const user= await User.findById(id)
       const friend=await User.findById(friend_id);
       if(!user && !friend){
        return res.status(404).json({msg:"User not found"});
       }
      else
      {
        if(user.friends.includes(friend_id))
          return res.status(200).json({msg:"Already a friend"})
        else
        {
          await user.updateOne({$push: {friends:friend_id}})
          await friend.updateOne({$push: {friends:id}})
          return res.status(200).json({msg:"Friends Added"})
        }
      }
     }
     catch (err){
      // console.log(err);
      return res.status(500).json({msg:"Something went wrong"})
     }
}






module.exports = { loginUser, registerUser,addFriend};