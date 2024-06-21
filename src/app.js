const express = require('express');
const Userrouter = require('./routes/user.routes');
const Rolerouter = require('./routes/role.routes');
const cookieparser = require('cookie-parser')
const authorize = require('./middlewares/authorize')

const app = express();

app.use(express.json({limit:'20kb'}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(cookieparser());

// send EmailId,role,accessType for authorization to call these API's.
app.use('/profile/',authorize,Userrouter);
app.use('/manage-role',authorize,Rolerouter);

module.exports = app;

