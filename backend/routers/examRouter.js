import express from "express";
import multer from 'multer'
import getQuestions,{addQuestion,updateQuestion,deleteQuestion}  from "../controllers/examController.js";
const examRouter = express.Router()

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

examRouter.get('/getQuestions',getQuestions)
examRouter.post('/addQuestions',upload.single('file'), addQuestion)
examRouter.post('/updateQuestions',updateQuestion)
examRouter.post('/deleteQuestions',deleteQuestion)

export default examRouter