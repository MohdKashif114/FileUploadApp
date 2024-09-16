const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
//local file upload handler function

exports.localFileUpload = async (req,res) =>{
    try{
        //fetch file
        const file=req.files.file;
        console.log("The file is ->",file);

        let path = __dirname + "/files/" + Date.now()+`.${file.name.split('.')[1]}`;
        console.log("PATH ->",path);

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully",
        });
    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    options.resource_type="auto";

    if(quality){
        options.quality = quality;
    }
     
    return await cloudinary.uploader.upload(file.tempFilePath, options);
    
}

//image upload ka handler
exports.imageUpload = async (req,res)=>{
    try{
        
        const{name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("ok");

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }
        console.log("ok2");
        //file format supported
        const response = await uploadFileToCloudinary(file,"Codehelp");
        console.log(response);
        console.log("ok3");
        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully Uploaded",
        })


    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Smtg went wrong",
        });

    }
}

exports.imageSizeReducer = async (req,res)=>{
    try{
        
        const{name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("ok");

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }
        console.log("ok2");
        //file format supported
        const response = await uploadFileToCloudinary(file,"Codehelp",10);
        console.log(response);
        console.log("ok3");
        //db me entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully Uploaded",
        })


    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Smtg went wrong",
        });

    }
}

//video upload ka handler

exports.videoUpload = async (req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        //validation

        const supportedTypes=["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported",
            })
        }
        const response=await uploadFileToCloudinary(file,"Codehelp");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
    }
    catch(error){
         console.error(error);
         res.status(400).json({
            success:false,
            message:"Smtg went wrong",
        });
    }
}