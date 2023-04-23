import express from 'express'
import getResult,{addResult} from  '../controllers/resultController.js'

const resultRouter = express.Router()

resultRouter.post('/getReport',getResult);
resultRouter.post('/addResult', addResult);

export default resultRouter