const {Router} = require('express');
const {registeruser,viewuser,updateuser,deleteuser} = require('../controllers/user.controller')
const Userrouter = Router();

// user routes

Userrouter.route('/registeruser').post(registeruser);

Userrouter.route("/viewuser").get(viewuser)

Userrouter.route("/updateuser/:EmployeeId").patch(updateuser);

Userrouter.route("/deleteuser/:EmployeeId").put(deleteuser);

module.exports = Userrouter;