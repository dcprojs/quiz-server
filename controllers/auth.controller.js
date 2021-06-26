const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = async (req,res) => {
    const {email, password }=  req.body
    try{
        const user = await User.find({email})
        if(!user) return res.status(401).send({err: 'Invalid credentials'})
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if(!isValidPassword) return res.status(401).send({err: 'Invalid credentials'})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        const data = {
            id: user._id,
            token,
            role: user.role
        }
        return res.status(200).json({data})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.signup = async (req,res) => {
    try{
        const {email, name, organization}  = req.body
        const emailExists = await User.findOne({email})
        if(emailExists) return res.status(409).send({err: 'Email already registered'})
        const user = new User({name, email, organization})
        const data = await user.save()
        return res.status(201).json({data})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}