import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
const generateToken=async(userId)=>{
    const user= await User.findById(userId);
    if(!user){
        throw new ApiError(400,"User not autheticated")
    }
    const accesstoken=user.generateAcessToken()
    const refreshaccesstoken=user.generaterefreshAcessToken()
    user.refreshAccessToken=refreshaccesstoken;
    await user.save({validateBeforeSave:false});
    return{accesstoken,refreshaccesstoken}
    
}

const registerUser=asyncHandler(async(req,res)=>{
    const{userName,password}=req.body;
    if(!userName){
        throw new ApiError(400,"Username not found")
    }
    if(!password){
        throw new ApiError(400,"Password not found")
    }
    const existedUser=await User.findOne({userName})
    if(existedUser){
        throw new ApiError(400,"User already exists!!!")
    }
    const user=await User.create({
        userName:userName,
        password:password
    })
    const crreatedUser=await User.findById(user._id);
    if(!crreatedUser){
        throw new ApiError(400,"Error in creating the user")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,crreatedUser,"User created sucessfully!!!"))

})
const loginUser=asyncHandler(async(req,res)=>{
    const{userName,password}=req.body;
    if(!userName){
        throw new ApiError(400,"Username not found") 
    }
    if(!password){
        throw new ApiError(400,"Password not found")
    }
    const existedUser=await User.findOne({userName});
    if(!existedUser){
        throw new ApiError(400,"User does not exists")
    }
    const isValid=await existedUser.isPassWordCorrect(password);
    if(!isValid){
        throw new ApiError(400,"Password is invalid")
    }
    const Options=
    {
        httpOnly: true,
        partitioned:true,
        secure: true,
        sameSite:'Lax',
    }
    const {accesstoken,refreshaccesstoken}=await generateToken(existedUser._id);
    const loggedInUser = await User.findById(existedUser._id).select(
        "-password -refreshAccessToken"
    );
    return res
    .status(200)
    .cookie("accessToken",accesstoken,Options)
    .cookie("refreshAccessToken",refreshaccesstoken,Options)
    .json(new ApiResponse(200,loggedInUser,"User logged in successfully"))


})
export{registerUser,loginUser}