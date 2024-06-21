const ApiError = require( '../utils/ApiError');
const ApiResponse  = require('../utils/ApiResponse')
const asynchandler = require('../utils/AsyncHandler')
const User = require('../models/user.models')


const registeruser = asynchandler(async(req,res,next)=>{

    const {EmailId,Status,FirstName,Mobile,EmployeeId} = req.body;
    if ([EmailId,Status,FirstName,Mobile,EmployeeId].some((field)=>{field?.trim==""})){
            throw new ApiError(401,"all fields are required !")
        }
    
    const existingUser = await User.findOne({$or:[{EmailId},{EmployeeId}]})
    // const existingUser = await User.findById(newUser._id);
    if(existingUser){
        throw new ApiError(409,"User already exists !")
    }
    const createdUser = await User.create({
        EmailId,
        Status,
        FirstName,
        Mobile,
        EmployeeId
    })
    if(!createdUser){
        throw new ApiError(402,"user registration failed !")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registration successful !")
    )
})

const viewuser = asynchandler(async(req,res,next)=>{    
    const {EmailId} = req.body;
    const user = await User.findOne({EmailId:EmailId})
    if(!user){
        throw new ApiError(401,"no user found with this username")
    }
    return res.status(200).json(new ApiResponse(200,user,"user details fetched successfully"))
})

const updateuser = asynchandler(async(req,res,next)=>{
    const {EmailId,Status,FirstName,Mobile,EmployeeId} = req.body;
    if(!(EmployeeId)){
        throw new ApiError(401,"please share employeeId to update its details")
    }
    const updatedacc = await User.findOneAndUpdate({EmployeeId:EmployeeId},{
        FirstName:FirstName,
        Status:Status,
        Mobile:Mobile,
        EmailId:EmailId
    },{
        new:true
    })
    if(!updatedacc){
        throw new ApiError(401,"updation failed ")
    }
    return res.status(200).json(
        new ApiResponse(200,'acc details updated successfully',updatedacc)
    )

})
const deleteuser = asynchandler(async(req,res,next)=>{
    const EmployeeId = req.params.EmployeeId;
    if(!(EmployeeId)){
        throw new ApiError(401,"please share employeeId to delete this acc.")
    }
    const deleted = await User.findOneAndDelete({EmployeeId:EmployeeId});
    if(!deleted){
        throw new ApiError(401,"deletion failed");
    }
    return res.json(200).json(
        new ApiResponse(200,"acc deleted permanently !",deleted)
    )
})

module.exports={registeruser,viewuser,updateuser,deleteuser}