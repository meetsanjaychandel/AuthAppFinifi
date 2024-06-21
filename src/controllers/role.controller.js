const ApiError = require( '../utils/ApiError');
const ApiResponse  = require('../utils/ApiResponse')
const asynchandler = require('../utils/AsyncHandler')
const Role = require('../models/role.models');

 const createrole = asynchandler(async(req,res,next)=>{
    const {roleName,accessLevels}= req.body;
    const result = await Role.create({
        roleName:roleName,
        accessLevels:accessLevels
    }
    )
    const createdRole = await Role.findById(result._id);
    if(!createdRole){
        throw new ApiError(401,'no role created !')
    }
    return res.status(201).json(
        new ApiResponse(200,createdRole,"role creation successful !")
    )
})

 const getrole = asynchandler(async(req,res,next)=>{

    const roleName = req.query.roleName;

    const query = {roleName:roleName}

    const roledetails = await Role.findOne(query);
    if(!roledetails){
        throw new ApiError(401,"no role details found for this rolename !")
    }
    return res.status(201).json(new ApiResponse(200,roledetails,"Role details: "));
})
 const updaterole = asynchandler(async(req,res,next)=>{

    const roleName = req.params.roleName;
    const { oldPageRoute, newAccessType, newPageRoute } = req.body;

    const filter= {roleName:roleName,"accessLevels.pageRoute":oldPageRoute}

    const updatedrole= await Role.updateOne(filter,
                        {$set:{"accessLevels.$.accessType":newAccessType,
                            "accessLevels.$.pageRoute":newPageRoute
                        }},
                        {new:true}
                    )

    if(!updatedrole){
        throw new ApiError(401,'role not updated')
    }
    return res.status(200).json(new ApiResponse(200,
        'role updated successfully',updatedrole));
})
 const deleterole = asynchandler(async(req,res,next)=>{
    const roleName = req.params.roleName;
    console.log(roleName);
    const result = await Role.deleteOne({roleName:roleName});
    if(!result){
        throw new ApiError(401,'deletion failed');
    }
    return res.status(200).json(
        new ApiResponse(200,"role deletion successful",result)
    )
})


module.exports={createrole,getrole,updaterole,deleterole}