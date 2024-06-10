import Connect_DB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv"
dotenv.config({path:"./env"})// for accessing the .env variables
Connect_DB()
.then(() => {
    app.listen((process.env.PORT),()=>{
        console.log(`Server is running on port:${process.env.PORT}`);
    })
    
}).catch((err) => {
    console.log("MONGODB Conncetion Failed",err)
});