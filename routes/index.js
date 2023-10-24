const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { loginUser, registerUser} = require("../controllers/users");
const { bookSlot, allSlot, pendingSlot, completedSlot } = require("../controllers/slots");


//Routes for user 
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/bookSlot",auth,bookSlot);

//Routes for slots
router.post("/allSlots",auth,allSlot);
router.post("/pendingSlots",auth,pendingSlot);
router.post("/completed",auth,completedSlot);


module.exports = router;