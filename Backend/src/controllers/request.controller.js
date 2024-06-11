import mongoose from "mongoose";
import { Request } from "../models/request.model.js";
import ApiError from "../utils/apiError.js";
const saveRequest=async function(requestId, requestTime, location, civilianId, status){
    const newReq= await Request.create({
        "_id":requestId,
        requestTime: requestTime,
        location: location,
        civilianId: civilianId,
        status: status

    })
    if(!newReq){
        throw new ApiError(400,"Request not created!!!")
    }
    return newReq.save();
    
    }
const updatereq=async function(issueId,copId,stat){

    const newreq= await Request.findOneAndUpdate({"_id":issueId},{
        status:stat,
        copId:copId
    })
    if(!newreq){
        throw new ApiError(400,"Request is not generated!!!")
    }
    await newreq.save();

    return newreq



    }
export {saveRequest,updatereq}