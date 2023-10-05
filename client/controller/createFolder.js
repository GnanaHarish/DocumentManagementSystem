import { createFolder } from "../client.js";

export async function createFolderController(req, res) {
  try {
    const { name, owner } = req.body;

    const response = await createFolder({ name, owner });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
