import { moveFile } from "../client.js";

export default async function moveFileController(req, res){
    try {
        const { fileId, folderId } = req.body;
        const response = await moveFile({ fileId, folderId });
        res.json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}