const mongoose = require("mongoose");

let slotsSchema = mongoose.Schema({
  user_id:{
    type:String,
    required:true
  },
  
});

module.exports = mongoose.model("slots", slotsSchema);