import mongoose from "mongoose";

const examSchema = mongoose.Schema({
    question:{type:String,required:true},
    type:{type:String,required:true},
    option1:{type:String,required:true},
    option2:{type:String,required:true},
    option3:{type:String,required:true},
    option4:{type:String,required:true},
    correct:{type:String,required:true}
},
{
    timestamps:true
})
const Exam = new mongoose.model('exam',examSchema)
export default Exam