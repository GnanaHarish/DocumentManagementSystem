
import Folder from "../../models/folder.js";
import File from "../../models/file.js";


export default async function moveFile(call, callback) {
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