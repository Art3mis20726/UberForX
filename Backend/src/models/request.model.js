import mongoose from "mongoose";
const requestSchema=mongoose.Schema({
    requestTime:{
        type:Date
    },
    location:{
        coordinates:[Number],
        address:{type:String}
    },civilianId:{type:String},
    copId:{type:String},
    status:{type:String}
},{timestamps:true})
export const Request=mongoose.model("Request",requestSchema)