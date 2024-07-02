const mongoose = require("mongoose");
const { type } = require("os");
const {Schema,model} = mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    paymentkey:{
        type: String,
        required:true,
        unique: true,
    }
});
const User = model("User",userSchema);
module.exports=User;