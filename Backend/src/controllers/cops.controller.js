import { Cops}from "../models/cops.model.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerCop=asyncHandler(async(req,res)=>{
    const {userId,location,email}=req.body;
    if(!userId){
        throw new ApiError(400,"User Id not received!!!");}
    if(!location){
        throw new ApiError(400,"Location not received")
    }
    if(!email){
        throw new ApiError(400,"Email not received")
    }
    const existedCop=await Cops.findOne({userId});
    if(existedCop){
        throw new ApiError(400,"Cop has alreday registered")
    }
    const cop= await Cops.create({
        userId:userId,
        location:location,
        email:email
    })
    const copCreated=await Cops.findById(cop._id).select("-email");

    if(!copCreated){
        throw new ApiError(400,"Error in registering the cop!!!")
    }
    return res.status(200)
    .json(new ApiResponse(200,copCreated,"Cop registered Successfully!!!"))

})
export{ registerCop}