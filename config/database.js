const mongoose=require("mongoose");
require("dotenv").config();


const DBconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{

    })
    .then(()=>console.log("Connection to database is successful"))
    .catch((error)=>{
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports=DBconnect;