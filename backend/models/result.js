import mongoose from 'mongoose'

const resultSchema = mongoose.Schema({
    stdName:{type:String , required:true},
    phone:{type:String , required:true},
    email:{type:String , required:true},
    resident:{type:String , required:true},
    edu_Level:{type:String , required:true},
    totalQuestions:{type:String,required:true},
    totalIncorrect:{type:Array,required:true},
    totalCorrect:{type:Array,required:true},
    percentage:{type:String , required:true},

},
{
    timestamps:true
})
const Result = new mongoose.model("result",resultSchema)
export default Result