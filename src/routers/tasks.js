const express = require('express');   // import express//
const router = express.Router();     // create an instance of express.Router()//
const Task = require('../models/tasks');     // import the user model //

// CRUD operations --> Create Read Update Delete //

// Create and post a task //
router.post('/tasks', async (req , res) =>{
    try{
        const task = new Task(req.body) // create a new task instance from the Task model //
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// Read a task by id //
router.get('/tasks/:id' , async(req , res)=>{
    try{
       const _id = req.params.id
         const task = await Task.findById(_id)
            if(!task){
                return res.status(404).send("Task not found")
            }
            console.log(task);
            res.status(200).send(task)            
    }
    catch(e){
        res.status(500).send(e.message)
    }
    
})


// update a task //
router.patch('/tasks/:id' , async (req , res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id , req.body ,{
            new :true ,
            runValidators : true
        })
        if(!task){
            return res.status(404).send("task not found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})



// export the router to be used in the app.js file //
module.exports = router;