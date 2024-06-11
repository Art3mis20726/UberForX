import mongoose from "mongoose";
import { createRequire } from "module";
import { saveRequest, updatereq } from "./src/controllers/request.controller.js";
import ApiError from "./src/utils/apiError.js";
import { findNearestCop } from "./src/controllers/user.controller.js";
import { log } from "console";

const require = createRequire(import.meta.url);
const socketIO = require('socket.io');

const initialize = function(server) {
    try {
        const io = socketIO(server);
    
        io.on('connection', (socket) => {
            console.log("A user just connected");
            socket.on('join', (data) => {
                socket.join(data.userId);
                console.log(`User joined room: ${data.userId}`);
            });
        
        socket.on('request-for-help',async(eventData)=>{
            const reqTime=new Date();
            const requestId = new mongoose.Types.ObjectId();
            const location = { // Convert latitude and longitude to [longitude, latitude]
                coordinates: [
                    eventData.location.longitude,
                    eventData.location.latitude
                ],
                address: eventData.location.address
            };
            const req=await saveRequest(requestId,reqTime,location,eventData.civilianId,'waiting')
            if(!req){
                throw new ApiError(400,"Error in making request")
                }
                const nearestCop=await findNearestCop(location.coordinates,5000);
                if(!nearestCop){
                    throw new ApiError(400,"Narest cop not found!!!")
                    }
                //  console.log(nearestCop);
            eventData.requestId = requestId;
            for (let i = 0; i < nearestCop.length; i++) {
                io.sockets.in(nearestCop[i].userId).emit('request-for-help', eventData);
            }
    
        }
    )
    socket.on('request-accepted',async(eventData)=>{
        const requestId = new mongoose.Types.ObjectId(eventData.requestDetails.requestId)
        const updatedreq= await updatereq(requestId,eventData.copDetails.copId,'engaged')
        io.sockets.in(eventData.requestDetails.civilianId).emit('request-accepted', eventData.copDetails)
    })
});
    } catch (error) {
        console.log("Error",error);
    }
    
};

export default initialize;
