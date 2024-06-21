const mongoose = require('mongoose')

const roleSchema= new mongoose.Schema({
    roleName:{
        type:String,
        required:true
    },
    accessLevels:[
        {
            accessType:{
                type:String,
                default:null
            },
            pageRoute:String
        }
    ]
})

const Role = mongoose.model("Role",roleSchema);
module.exports = Role;



