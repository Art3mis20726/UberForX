import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
const Connect_DB= async()=>{
    
try {
        const ConnectionIns=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nMONGODB CONNECTED!!! with host =>${ConnectionIns.connection.host}`);
    
} catch (error) {
    console.log("Error while connecting the database\n",error);
    process.exit(1);
}
}
export default Connect_DB;