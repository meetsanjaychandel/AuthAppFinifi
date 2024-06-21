const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const mongoose = require('mongoose');
const app= require('./app')


const DB_NAME='finifiDb';

const connectDb = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    }catch(error){
        console.log("error connecting to database",error);
    }
}


connectDb().then(()=>{
    app.on('Error',(error)=>{
        console.log("error connecting to database",error);
    })
    app.listen(process.env.PORT || 9000,()=>{
        console.log("server listening on PORT: ",`${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!",err);
})






