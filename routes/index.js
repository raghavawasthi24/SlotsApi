const express = require("express");
const router = express.Router();
// const multer = require("multer");
// const path = require("path");
const { loginUser, registerUser, addFriend } = require("../controllers/users");
const { bookSlot, getSlot, allSlot, pendingSlot, completedSlot } = require("../controllers/slots");

// const {
//   upload
//   } = require("../controllers/addPhoto");

// const {savePost,deletePost,likePost,unlikePost,commentPost,getPost,getAllPost} =require("../controllers/posts")

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/addfriend", addFriend);
router.post("/bookSlot",bookSlot);

router.get("/allSlots",allSlot);
router.get("/pendingSlots",pendingSlot);
router.put("/completed",completedSlot);

// router.post("/uploadPhoto",upload,(req,res)=>{
//   console.log("calling")
// });
module.exports = router;