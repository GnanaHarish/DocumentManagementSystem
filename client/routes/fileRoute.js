import express from 'express';
import { createFileController } from "../controller/createFile.js";
import moveFileController from '../controller/moveFile.js';
const router = express.Router();


//create a file

router.post("/create", createFileController);
router.post("/move", moveFileController)

export default router;