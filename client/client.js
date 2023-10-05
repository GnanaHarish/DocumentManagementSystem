import serviceDefinition from "../utils/client-definition.js";
import * as grpc from "@grpc/grpc-js";
const client = new serviceDefinition(
  "0.0.0.0:50051",
  grpc.credentials.createInsecure()
);

export async function createFile({ name, content, folder_id, owner }) {
  const request = {
    name,
    content,
    folder_id,
    owner,
  };

  console.log(request);

  try {
    const response = await new Promise((resolve, reject) => {
      client.CreateFile(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}


export async function createFolder({
    name,
    owner
}){
    const request = {
        name,
        owner
    }
    try {
        const response = await new Promise((resolve, reject) => {
          client.CreateFolder(request, (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          });
        });
    
        return response;
      } catch (error) {
        throw new Error(error);
      }
}


export async function moveFile({
    fileId,
    folderId,
}){
    const request = {
        fileId,
        folderId
    }


    try {
        const response = await new Promise((resolve, reject) => {
            console.log(request);
            client.MoveFile(request, (error, response) => {
              if (error) {
                reject(error);
              } else {
                resolve(response);
              }
            });
          });
      
          return response;
        
    } catch (error) {
        throw new Error(error);
    }
}


export async function getFoldersandFiles({
  owner
}){
  const request = {
    owner
}


try {
    const response = await new Promise((resolve, reject) => {
        client.ListFoldersAndFiles(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
  
      return response;
    
} catch (error) {
    throw new Error(error);
}
}

export async function getFilesInFolder({
  folderId,
  owner
}){
  const request = {
    folderId,
    owner
}


try {
    const response = await new Promise((resolve, reject) => {
        client.GetFilesInsideFolder(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
  
      return response;
    
} catch (error) {
    throw new Error(error);
}
}

export async function userLogin({
  username,
  password,
}){
  const request = {
    username,
    password,
}


try {
    const response = await new Promise((resolve, reject) => {
        client.UserLogin(request, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
  
      return response;
    
} catch (error) {
    throw new Error(error);
}
}