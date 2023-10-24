const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { loginUser, registerUser} = require("../controllers/users");
const { bookSlot, allSlot, pendingSlot } = require("../controllers/slots");


//Routes for user 
router.post("/login", loginUser);
router.post("/register", registerUser);

//Routes for slots
router.post("/bookSlot",auth,bookSlot);
router.post("/allSlots",auth,allSlot);
router.post("/pendingSlots",auth,pendingSlot);


module.exports = router;