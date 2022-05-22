
const mongoose = require('mongoose');    //mongose middleware //
const validator = require('validator');   // import validator //
const bcrypt = require('bcryptjs');    // import bcrypt //
const jwt = require('jsonwebtoken');    //JSON Web Token //

const userSchema = new mongoose.Schema({
    name : {
    type : String,
    required : true,
    trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        trim : true
    },
    age : {
        type : Number,
        default : 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens:[
        {
            type:String,
            required:true
        }
    ]
})
// Hash the plain text password before saving //
userSchema.pre('save' , async function(){ 
    if(this.isModified('password')){       
        this.password = await bcrypt.hash(this.password , 8)        
    }    
})
// Create a JWT and return it //
userSchema.methods.getSigninToken = async function(){
    const token = jwt.sign({_id : this._id.toString()} , "nodeJsCourse")
    this.tokens = this.tokens.concat(token)
    await this.save()   //important! --> save the user's tokens to the database //
    return token;
}

// Sign in user //
userSchema.statics.findByCredentials = async (email , password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unabe to login please check your mail or password')
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        throw new Error('Unabe to login please check your mail or password')
    }
    return user;
}

// <--note user model's line must be at the end of the code--> // 
const User = mongoose.model('User' , userSchema);
    

module.exports = User;