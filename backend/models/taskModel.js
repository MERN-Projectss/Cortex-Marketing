const { Schema ,ObjectId , mongoose, trusted} = require("mongoose")
const moment = require("moment")

const taskSchema = new Schema({

    title: { type: String, required: true, trim: true  , unique :true},

    taskDescription: { type: String, required: true, trim: true ,unique :true },

    taskStatus: { type: String, enums: ["pending", "completed","upcoming"], trim: true },

    deadline: { type: String, default: moment().add(24,'hours').format('LLLL') },

    isExpired: { type: Boolean, default: false },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },

    isDeleted : { type: Boolean, default: false }


})

module.exports = mongoose.model("Task",taskSchema)  //tasks