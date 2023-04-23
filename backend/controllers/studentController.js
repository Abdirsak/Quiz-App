import Student from "../models/students.js";

const getStudents = async (req , res)=>{
    const students = await Student.find()
    if(students){
        res.send (students)
    }
    else {
        res.send("Invalid Request")
    }
}

export const addStudent = async (req, res)=>{
    const student = new Student(req.body);
    await student.save()
    res.send("Student added Successfully")
}

export const updateStudent = async (req , res)=>{
    await Student.findOneAndUpdate({_id: req.body.stdId},req.body,{new: true})
    res.send("Student Updated Successfully")
}

export const deleteStudent = async(req, res)=>{
    await Student.findOneAndDelete({id: req.body.stdId})
    res.send("Student deleted succesfully!")
}

export const searchStudent = async(req ,res)=>{
    const {email} = req.body
    const std = await Student.findOne({email})
    if(std){
        res.send(std)
    }
    else{
        res.send('Doesnot exist')
    }
}

export const StudentLogin = async (req ,res)=>{
    const {userName , password} = req.body
    const std = await Student.findOne({userName ,password})
    if(std){
        res.send(std)
    }
    else{
        res.send('Doesnot exist')
    }
}

export default getStudents