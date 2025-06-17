import userModel from "../models/userModel.js";

// Register or Login Google user to MongoDB
export const authGoogle = async (req, res) => {
  const { _id, userName, email, image } = req.body;
  let user = await userModel.findById(_id);

  if (!user) {
    user = await userModel.create({ _id, userName, email, image });
    return res.status(201).json({ message: "User registered", user });
  }

  return res.status(200).json({ message: "User logged in", user });
};

// Alternative to create user in mongoose database

/*  
  const newUser = new userModel({ ... });
  await newUser.save();
*/
