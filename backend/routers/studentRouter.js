import express from "express";
import getStudents,{addStudent,updateStudent,deleteStudent, searchStudent, StudentLogin} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get('/getStudents',getStudents)
studentRouter.post('/addStudents',addStudent)
studentRouter.post('/updateStudents',updateStudent)
studentRouter.post('/deleteStudents',deleteStudent)
studentRouter.post('/searchStudent',searchStudent)
studentRouter.post('/studentLogin',StudentLogin);

export default studentRouter