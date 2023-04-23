import express from 'express';
import findAdmin ,{getAllAdmin, addAdmin} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/adminLogin',findAdmin);
adminRouter.get('/getAdmin',getAllAdmin);
adminRouter.post('/addAdmin',addAdmin)

export default adminRouter