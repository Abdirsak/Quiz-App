import Admin from '../models/admin.js';

const findAdmin = async (req , res)=>{
    const {userName , password} = req.body
    const admin = await Admin.findOne({userName,password})
    if(admin){
        res.send("Exist")
    }
    else{
        res.send("Doesnot exist")
    }
}
export const getAllAdmin = async (req , res)=>{
    const admin = await Admin.find()
    res.send(admin);
}

export const addAdmin = async (req ,res)=>{
    const newAdmin = new Admin(req.body)
    await newAdmin.save()
    res.send("Admin Added successfully!")
}
export default findAdmin