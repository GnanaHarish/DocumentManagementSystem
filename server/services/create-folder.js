import { v4 as uuidv4 } from "uuid";

import Folder from "../../models/folder.js";


export default async function createFolder(call, callback) {
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