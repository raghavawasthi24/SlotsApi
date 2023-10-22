const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const { loginUser, registerUser, addFriend } = require("../controllers/users");

// const {
//   upload
//   } = require("../controllers/addPhoto");

// const {savePost,deletePost,likePost,unlikePost,commentPost,getPost,getAllPost} =require("../controllers/posts")

router.post("/authenticate", loginUser);
router.post("/register", registerUser);
router.post("/addfriend", addFriend);

// router.post("/uploadPhoto",upload,(req,res)=>{
//   console.log("calling")
// });
module.exports = router;