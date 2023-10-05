import { getFoldersandFiles } from "../client.js";

export default async function getFoldersAndFilesController(req, res){
    try {
        const { owner } = req.body;
        const response = await getFoldersandFiles({ owner });
        res.json(response);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      }

}