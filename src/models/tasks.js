const mongoose = require('mongoose');   // install mongoose //
const validator = require('validator');  


const Task = mongoose.model('Task' , {
    title : {
        type : "String",
        required : true,
        trim : true
    },
    description : {
        type : "String",
        required : true,
        trim : true
    },
    completed : {
        type : "Boolean",
        default : false,
        required : true
    }
})


module.exports = Task;

////////////////////////////////////////////////////////////////////


// models --> task.js 
/**
 * tasks --> title:- string / required/ trim
 * description:- string/required/trim
 * completed:boolean / false
 */
/**
 * task.js
 * CRUD operarions 
 * post
 * get all tasks
 * get task by id
 * update certain task
 * delete task
 */
/**
 *conat varName = require(./routers/task)
 * app.use(varName)
 */