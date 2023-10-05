import express from 'express';
import { createFolderController } from "../controller/createFolder.js";
import getFoldersAndFilesController from '../controller/listFoldersAndFiles.js';
import getFolderFilesController from '../controller/listFolderFiles.js';
const router = express.Router();


//create a folder

router.post("/create", createFolderController);

router.get('/foldersandfiles', getFoldersAndFilesController);

router.get("/filesinfolder", getFolderFilesController);

export default router;