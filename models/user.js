const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo:{
    type:String
  },
  friends: {
    type: Array,
    default:[],
  }
});

module.exports = mongoose.model("User", userSchema);