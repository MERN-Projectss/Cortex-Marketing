
const taskModel = require("../models/taskModel")
const userModel = require("../models/userModel")
const { isValidName, isValidValue } = require("../vallidaters/validators")
const jwt = require('jsonwebtoken')


const createTask = async (req, res) => {
    try {
        let data = req.body
        let { title, taskDescription, taskStatus, deadline, createdBy } = data

        if (!title || !isValidValue(title)) return res.status(400).send({ status: false, message: " title is required " })

        //checking email entered by user is Valid or not?
        if (!isValidName(title)) return res.status(400).send({ status: false, message: `this title=> ${title} is not valid` })

        if (!taskDescription || !isValidValue(taskDescription)) return res.status(400).send({ status: false, message: " taskDescription is required " })

        //checking email entered by user is Valid or not?
        if (!isValidName(taskDescription)) return res.status(400).send({ status: false, message: `this taskDescription=> ${taskDescription} is not valid` })



        if (!["pending", "completed", "upcoming"].includes(taskStatus)) {
            return res.status(400).send({ status: false, msg: "Tast Status must includes ['pending', 'completed','upcoming']" })
        }

        // get userId from JWT token and settting up in task userId field

        let bearerToken = req.headers.authorization
        token = bearerToken.split(' ')[1]
        decodedToken = jwt.verify(token, "Cortex-Marketing-Pankaj")
        userId = decodedToken.userId

        // finding user's detail in user's collection
        const findUser = await userModel.findOne({ userId }).select({ firstName: 1, lastName: 1, email: 1, mobileNumber: 1 })
        console.log(findUser)

        // destructuring task data for setting up userId
        data = { title, taskDescription, taskStatus, deadline, createdBy: findUser }
       
        const toDoInfo = await taskModel.create(data)

        //toDoInfo.Populate({path:"userId"}).save()

        res.status(201).send({ status: true, Message: "task created successfully - ", toDoInfo })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const updateTask = async (req, res) => {
    try {
        
        let data = req.body
        let { title, taskDescription, taskStatus, deadline } = data

        if (!title || !isValidValue(title)) return res.status(400).send({ status: false, message: " title is required " })

        //checking email entered by user is Valid or not?
        if (!isValidName(title)) return res.status(400).send({ status: false, message: `this title=> ${title} is not valid` })

        if (!taskDescription || !isValidValue(taskDescription)) return res.status(400).send({ status: false, message: " taskDescription is required " })

        //checking email entered by user is Valid or not?
        if (!isValidName(taskDescription)) return res.status(400).send({ status: false, message: `this taskDescription=> ${taskDescription} is not valid` })



        if (!["pending", "completed", "upcoming"].includes(taskStatus)) {
            return res.status(400).send({ status: false, msg: "Tast Status must includes ['pending', 'completed','upcoming']" })
        }

        const findItem = await taskModel.findOneAndUpdate({ title: title},{ taskDescription :taskDescription,taskStatus : taskStatus}, { $set: { mark: true } })

        res.status(201).send({ status: true, Message: "Task upadated successfully - ", findItem })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const deleteATask = async (req, res) => {
    try {
        let data = req.body
        let {title } = data
        
        
        if (!title || !isValidValue(title)) return res.status(400).send({ status: false, message: " title is required " })
        //checking title entered by user is Valid or not?
        if (!isValidName(title)) return res.status(400).send({ status: false, message: `this title=> ${title} is not valid` })

        const findTask = await taskModel.findOne({title: title , isDeleted: false})
       
        if (!findTask.title) return res.status(400).send({ status: false, message: `this title=> ${findTask.title} does not exists in our database`  })

        if (findTask.isDeleted == true) return res.status(400).send({ status: false, message: `this task=> ${findTask.title} already has been deleted`  })


        let TaskData = {
            _id :findTask._id,
            isDeleted : true
        }


        const deleteTask = await taskModel.findOneAndUpdate({ _id :findTask._id  }, TaskData, { new: true })

        res.status(201).send({ status: true, Message: "Task removed successfully - ", deleteTask })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getAllTask = async (req, res) => {
    try {
      let data = req.query
      const {title,taskStatus,deadline,isExpired, createdBy, isDeleted} = data
        console.log(data)
        let filter = {
            title ,
        taskStatus :{$in :["pending", "completed","upcoming"]},
        deadline,
        isExpired,
        createdBy,
        isDeleted
        }
        console.log(filter.taskStatus)
        const list = await taskModel.find(data)
        return res.status(200).send({ status: true,totalTask : list.length, Message: "List of all Tasks- ", list })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createTask, updateTask, deleteATask, getAllTask }

