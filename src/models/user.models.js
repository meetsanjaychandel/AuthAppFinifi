const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    EmailId:{
        type:String,
        required:true,
        unique:true
    },
    Status:{
        type:String,
        required:true
    },
    FirstName:{
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        required:true,
        unique:true
    },
    EmployeeId:{
        type:Number,
        required:true,
        unique:true
    },
    Role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
    }

})

module.exports = mongoose.model("User",userSchema);
