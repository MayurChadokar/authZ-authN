const mongoose=  require("mongoose");

require("dotenv").config();

exports.connect =()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    })
    .then(()=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log("db connection issye");
        console.error(err);
        process.exit(1);

    })
}