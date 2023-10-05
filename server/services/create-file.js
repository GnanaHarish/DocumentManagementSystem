import { v4 as uuidv4 } from "uuid";

import File from "../../models/file.js";

export default async function createFile(call, callback) {
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


  