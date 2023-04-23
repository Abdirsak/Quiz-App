import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    adminName : {type:String , required : true},
    email : {type:String , required : true},
    gender : {type:String , required : true},
    userName : {type:String , required : true},
    password : {type:String , required : true}
},
{
    timestamps : true
}) 
const Admin = new mongoose.model("admin",adminSchema)
export default Admin