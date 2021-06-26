const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user'
    },
    organization:{
        type: String
    },
    isActive:{
        type: Boolean,
        default: false
    },
    isBanned:{
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = bcrypt.hashSync(user.password, 12)
    }
    next()
})

const User = mongoose.model("User", UserSchema)

module.exports = User