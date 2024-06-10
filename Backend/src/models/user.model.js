import mongoose  from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../utils/apiError.js";
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
        trim :true
    },
    password:{
        type:String,
        required:true,
    },
    acessToken:{
        type:String
    },
    refreshAccessToken:{
        type:String
    }

},{timestamps:true})
 userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
 })
 userSchema.methods.isPassWordCorrect=async function(password){
    if(!password){
        throw new ApiError(400,"Password is missing")
    }
    return await bcrypt.compare(password,this.password);
 }
 userSchema.methods.generateAcessToken=function(){
    return jwt.sign({
        _id:this._id,
        userName:this.userName
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
 }
 userSchema.methods.generaterefreshAcessToken=function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_ACCESS_TOKEN_SECRET,{expiresIn:process.env.REFRESH_ACCESS_TOKEN_EXPIRY}
    )
 }


export const User=mongoose.model("User",userSchema)