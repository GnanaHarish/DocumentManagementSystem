import { getFilesInFolder } from "../client.js";


export default async function getFolderFilesController(req, res){
    try {
        const { folderId, owner } = req.body;
        const response = await getFilesInFolder({folderId,  owner });
        res.json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}