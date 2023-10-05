
import User from "../../models/user.js";
import bcrypt from "bcrypt";



export default async function UserLogin(call, callback) {
    const request = call.request;
    var token;
    try {
      let user = await User.findOne({
        username: request.username,
      });
  
      if (!user) {
        const salt = await bcrypt.genSalt(10);
         token = uuidv4();
        const hashedPassword = await bcrypt.hash(request.password, salt);
        const newUser = await User.create({
          id: token,
          username: request.username,
          password: hashedPassword,
        });
  
        user = await newUser.save();
      } else {
        const passwordMatch = await bcrypt.compare(
          request.password,
          user.password
        );
        if (!passwordMatch) {
          throw new Error("Password mismatch");
        } else {
          token = user.id;
        }
      }
  
      const response = {
        success: true,
        token: token,
      };
  
      callback(null, response);
    } catch (error) {
      console.log(error);
      callback(error, null);
    }
  }