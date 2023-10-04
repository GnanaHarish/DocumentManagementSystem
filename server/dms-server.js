import { Server, ServerCredentials } from "@grpc/grpc-js";
import * as grpc from "@grpc/grpc-js";
import { loadPackageDefinition } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import File from "../models/file.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import Folder from "../models/folder.js";
import User from "../models/user.js";

import connectToDatabase from "../config/db.js";

const packagingDefinition = protoLoader.loadSync("../dms.proto");
const proto = grpc.loadPackageDefinition(packagingDefinition);

//Connect to DB
connectToDatabase();
//Create File
async function createFile(call, callback) {
  const request = call.request;

  try {
    const fileId = uuidv4();
    //Change it to handle multiple file with same name
    const newFile = new File({
      id: fileId,
      name: request.name,
      content: request.content,
      folder_id: request.folder_id,
      owner: request.owner.id,
    });

    await newFile.save();

    const response = {
      file: {
        id: newFile._id.toString(),
        name: newFile.name,
        content: newFile.content,
        folder_id: newFile.folder_id,
        owner: {
          id: newFile.owner,
          username: request.owner.username,
        },
      },
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

async function createFolder(call, callback) {
  const request = call.request;
  //Change it to handle multiple folder with same name
  try {
    const folderId = uuidv4();
    const newFolder = new Folder({
      id: folderId,
      name: request.name,
      owner: request.owner.id,
    });
    await newFolder.save();

    const response = {
      folder: {
        id: newFolder._id.toString(),
        name: newFolder.name,
        owner: {
          id: newFolder.owner,
          username: request.owner.username,
        },
      },
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

//Move a file
async function moveFile(call, callback) {
  const request = call.request;
  try {
    const fileToMove = await File.findOne({
      id: request.fileId,
    });

    if (!fileToMove) {
      throw new Error("File not found");
    }

    const targetFolder = await Folder.findOne({
      id: request.folderId,
    });

    if (!targetFolder) {
      throw new Error("Folder not found");
    }

    fileToMove.folder_id = request.folderId;
    await fileToMove.save();

    const response = {
      file: {
        id: fileToMove.id,
        name: fileToMove.name,
        content: fileToMove.content,
        folder_id: request.folderId,
        owner: {
          id: targetFolder.owner,
          username: targetFolder.name,
        },
      },
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

//List all folders and files which is not in a folder
async function listFoldersandFiles(call, callback) {
  const request = call.request;
  try {
    const folders = await Folder.find({
      owner: request.owner.id,
    });
    const folderList = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      owner: {
        id: folder.owner,
        username: request.owner.name,
      },
    }));

    const unfolderedFiles = await File.find({
      folder_id: null,
      owner: request.owner.id,
    });
    const unfolderedFilesList = unfolderedFiles.map((file) => ({
      id: file.id,
      name: file.name,
      content: file.content,
      owner: {
        id: file.owner,
        username: request.owner.name,
      },
    }));

    const response = {
      folders: folderList,
      files: unfolderedFilesList,
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

//List files in the folder

async function listFilesInsideFolder(call, callback) {
  const request = call.request;
  let message = "";
  console.log(request);

  try {
    const folderId = request.folderId;
    const folder = await Folder.findOne({
      id: folderId,
      owner: request.owner.id,
    });

    if (!folder) {
      throw new Error("Folder not found");
    }

    const file = await File.findOne({
      folder_id: folderId,
      owner: request.owner.id,
    });
    if (!file) {
      message = "No file inside this folder.";
    }

    const response = {
      file: {
        id: file.id,
        name: file.name,
        content: file.content,
        owner: {
          id: file.owner,
          username: request.owner.username,
        },
      },
      message,
    };
    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}

//User Login

async function UserLogin(call, callback) {
  const request = call.request;
  var token;
  try {
    let user = await User.findOne({
      username: request.username,
    });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
       token = uuidv4();
      const hashedPassword = await bcrypt.hash(request.password, salt);
      const newUser = await User.create({
        id: token,
        username: request.username,
        password: hashedPassword,
      });

      user = await newUser.save();
    } else {
      const passwordMatch = await bcrypt.compare(
        request.password,
        user.password
      );
      if (!passwordMatch) {
        throw new Error("Password mismatch");
      } else {
        token = user.id;
      }
    }

    const response = {
      success: true,
      token: token,
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    callback(error, null);
  }
}
const server = new Server();

const serviceDefinition =
  proto.documentmanagementsystem.DocumentManagementSystem.service;
server.addService(serviceDefinition, {
  CreateFile: createFile,
  CreateFolder: createFolder,
  MoveFile: moveFile,
  ListFoldersAndFiles: listFoldersandFiles,
  GetFilesInsideFolder: listFilesInsideFolder,
  UserLogin: UserLogin
});

const PORT = process.env.PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (!err) {
      console.log(`Server started on port ${port}`);
      server.start();
    } else {
      console.error("Error starting server:", error);
    }
  }
);
