import { createFile } from "../client.js";

export async function createFileController(req, res) {
  try {
    console.log(req.body)
    console.log(req.body.name)
    const { name, content, folder_id, owner } = req.body;

    const response = await createFile({ name, content, folder_id, owner });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
