import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'
import studentRouter from "./routers/studentRouter.js";
import adminRouter from "./routers/adminRouter.js";
import examRouter from './routers/examRouter.js'
import resultRouter from './routers/resultRouter.js';

dotenv.config()

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to the db")
}).catch((err)=>{
    console.log(err.message)
})

app.use(express.json())
app.use(cors())
app.get('/',(req , res)=>{
    res.send('test')
})
app.use('/students/', studentRouter);
app.use('/admin/', adminRouter)
app.use('/exam/',examRouter),
app.use('/report/',resultRouter)
const PORT = process.env.PORT || 2000;

app.get('/readAudio/:name', (req, res) => {
    const { name } = req.params;
    const filePath = "E:\\Abdirizak\\Web devlopment\\Projects\\QuizApp\\backend\\uploads\\" + name;
    res.sendFile(filePath);
})

app.listen(PORT , ()=>{
    console.log(`serevr is running at ${PORT}`)
})