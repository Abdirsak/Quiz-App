import Result from '../models/result.js'

const getResult = async (req ,res)=>{
    const {email} = req.body
    const data = await Result.findOne({email})
    if(data){
        res.send(data)
    }
    else{
        res.send('Doesnot Exist')
    }
}

export const addResult = async (req , res)=>{
    const newResult = new Result(req.body)
    await newResult.save()
    res.send("Result Added Successfully")
}
export default getResult