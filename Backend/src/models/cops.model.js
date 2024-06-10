import mongoose from "mongoose";
const copSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    displayName: { type: String, trim: true },
	phone: { type: String },email:{
		type:String
	},
	earnedRatings: { type: Number },
	totalRatings: { type: Number },
	location: {
		type: {
			type: String,
			required: true,
			default: "Point"
		},
		address: { type: String },
		coordinates: [ Number ],
	}

},{timestamps:true})
export const Cops=mongoose.model("Cops",copSchema)