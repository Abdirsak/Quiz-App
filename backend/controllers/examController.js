import Exam from '../models/exam.js'

const getQuestions = async (req , res)=>{
    const question = await Exam.find();
    res.send(question)
}

export const addQuestion = async (req ,res)=>{
    const newQuestion = new Exam(req.body)
    await newQuestion.save();
    res.send("Question Added Successfully")
}

export const updateQuestion = async(req,res)=>{
    try{
        await Exam.findOneAndUpdate({_id:req.body.question_Id},req.body,{new: true});
        res.send("Question Updated Successfully")
    }
    catch(err){
        res.send(err)
    }
}

export const deleteQuestion = async (req , res)=>{
    await Exam.findOneAndDelete({_id:req.body.question_Id})
    res.send("question Deleted Successfully")
}
export default getQuestions