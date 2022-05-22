const express = require('express');   // import express//
const router = express.Router();     // create an instance of express.Router()//
const User = require('../models/user');     // import the user model //

// CRUD operations --> Create Read Update Delete //

// ---Create a user--- //
// sign up//
router.post('/signup', async (req, res) => {        
    try{
    const user = new User(req.body)   // create a new user instance from the user model //
    const token = await user.getSigninToken()  // generate a token for the user //
    await user.save()                // save the user instance to the database //
    res.status(200).send({user , token})           // send the user and the token to the client //
    }
    catch(error){
        res.status(400).send(error)
    }
})

// login //
router.post('/login' , async (req , res) =>{
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.getSigninToken()
         res.send({user , token})    // send the user and token without status //    
    }
    catch(e){
        res.send(e.message)      // send the error message without status //
    }
})

//  ---Read all users--- //
// get all users //
router.get('/signup' , (req , res) =>{
    User.find({}).then((users) =>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

// find a user by id //
router.get('/signup/:id' , (req , res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            console.log(user);   
            return res.status(404).send("User not found")
        }
        res.status(200).send(user) 
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

// Update a user V1 //
// router.patch('/signup/:id' , async (req , res)=>{
//     try{                                             
//         const user =await User.findByIdAndUpdate(req.params.id , req.body ,{                                        //update Query options//
//             new:true , 
//             runValidators: true
//         })
//         if(!user){
//             return res.status(404).send("user not found")
//         }
//         res.status(200).send(user)                                               
//     }catch(e){
//         res.status(400).send(e.message)
//     }                  
// })

// ---Update a user V2--- //
router.patch('/signup/:id' , async(req ,res) =>{
    try{
        const updates = Object.keys(req.body)
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send("user not found")
        }
        updates.forEach((el)=>{
            user[el] = req.body[el]            
        })
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

// ---Delete a user--- //
router.delete('/signup/:id' , async (req , res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send("User not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

// export the router //
module.exports = router;
