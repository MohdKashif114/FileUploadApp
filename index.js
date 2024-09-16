const express= require("express");
const app= express();

//find port
require("dotenv").config();
const PORT = process.env.PORT || 3500;

//middleware add krne hai
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
      useTempFiles:true,
      tempFileDir:'/tmp'
}));

//connect to db
const db= require("./config/database");
db();

//connect to cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna hai
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT,() =>{
      console.log(`App is running at ${PORT} `);
});