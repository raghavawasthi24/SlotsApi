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
  id:{
    type:Number,
    required:true
  },
  slots:{
    bookedByMe:[
    {
        warden_id:{
            type:String,
            required:true
        },
        day:{
            type:String,
            required:true
        },
        time:{
             type:String,
             required:true
        },
        duration:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    }
],
bookedByOther:[
    {
        warden_id:{
            type:String,
            required:true
        },
        day:{
            type:String,
            required:true
        },
        time:{
             type:String,
             required:true
        },
        duration:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    }
]
}
});

module.exports = mongoose.model("User", userSchema);