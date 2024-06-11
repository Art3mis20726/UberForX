import Connect_DB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv"
import initialize from "../socket-events.js";
import http from "http";
const server=http.Server(app);
dotenv.config({path:"./env"})// for accessing the .env variables
Connect_DB()
.then(() => {
    server.listen((process.env.PORT),()=>{
        console.log(`Server is running on port:${process.env.PORT}`);
        initialize(server);
    })
    
}).catch((err) => {
    console.log("MONGODB Conncetion Failed",err)
}); 