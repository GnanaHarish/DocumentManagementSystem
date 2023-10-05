import { userLogin } from "../client.js";

export async function userLoginController(req, res) {
  try {
    const { username, password } = req.body;

    const response = await userLogin({  username, password  });
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
