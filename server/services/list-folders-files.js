

import Folder from "../../models/folder.js";
import File from "../../models/file.js";

export default async function listFoldersandFiles(call, callback) {
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