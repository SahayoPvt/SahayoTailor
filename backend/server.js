import app from './app.js';
import { connectMongoDatabase } from './config/db.js';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';
import 'dotenv/config';
const db=process.env.MONGODB_URI
console.log("cloud_name",process.env.SMTP_SERVICE);
console.log("api_key",process.env.SMTP_PASSWORD);
console.log("api_secret",process.env.SMTP_MAIL);
connectMongoDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET ,
})
// Handle uncaught exception errors
process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1);
    
})

const port =process.env.PORT || 8000;
// export const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   });

const server=app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`);
    
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
    
})