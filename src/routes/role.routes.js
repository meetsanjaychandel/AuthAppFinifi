const {Router} = require('express')
const {createrole,getrole,updaterole,deleterole} = require('../controllers/role.controller')
const Rolerouter = Router();

// role routes
// veryjwt and user then only he can call these api's.

Rolerouter.route("/createrole").post(createrole);
Rolerouter.route("/getrole").get(getrole);
Rolerouter.route("/updaterole/:roleName").patch(updaterole);
Rolerouter.route("/deleterole/:roleName").delete(deleterole)

module.exports= Rolerouter;