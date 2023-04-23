import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    stdName : {type :String , required : true},
    email:{type : String , required : true},
    phone:{type: String , required : true},
    residence:{type: String , required : true},
    edu_Level:{type: String , required : true},
    gender:{type: String , required : true},
    userName : {type : String , required : true},
    password : {type : String , required : true}
},
{
    timestamps : true
})

const Student = new mongoose.model('student', studentSchema)
export default Student