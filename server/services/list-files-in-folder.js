

import Folder from "../../models/folder.js";
import File from "../../models/file.js";


export default async function listFilesInsideFolder(call, callback) {
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