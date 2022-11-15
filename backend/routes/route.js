const express = require("express")
const route = express.Router()

const {regUser,userLogin,getUser} = require("../controllers/usercontroller.js")


const {authentication} = require("../middleware/auth")
route.post("/regUser",regUser)

route.post("/login",userLogin)

route.get("/getUser",getUser )


const {createTask,updateTask,deleteATask, getAllTask }    = require("../controllers/taskController.js")


route.post("/createTask",authentication,createTask)

route.put("/updateTask", authentication ,updateTask)

route.patch("/deleteATask",authentication,deleteATask)


route.get("/getAllTask",authentication,getAllTask)

module.exports = route