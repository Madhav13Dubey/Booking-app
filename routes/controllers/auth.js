// import bcrypt from "bcryptjs";
// import user from "../models/user.js";

// export const register = async(req,res,next)=>{
//     try{                            // bcryptjs is used to to hashed the password which is more secured by ordinary password //  
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);
//       const newUser = new user({
//         username: req.body.username,
//         email: req.body.email,
//         password: hash,
//       });

//       await newUser.save();          // provide more security to password//
//       res.status(200).send("User has been created!");
//     }catch(err){
//         next(err);
//     }
// };

// export const login = async(req,res,next)=>{
//     try{                             
//         const user = await user.findOne({username:req.body.username});
//         if (!user) return next(createError(404, "User not Found!"));           // Custom error if searched usename is not found //
       
//         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
//         if(!isPasswordCorrect) return next(createError(400, "Wrong Password or username!"));
       
//         res.status(200).json(user);
//     } catch(err) {
//         next(err);
//     }
// };

import bcrypt from "bcryptjs";
import User from "../models/user.js";  // Use uppercase for model name

export const register = async (req, res, next) => {
  try {
    // bcryptjs is used to hash the password which is more secure than plain passwords
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save(); // Save the new user with the hashed password
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username }); // Renamed local variable to avoid conflict
    if (!existingUser) return next(createError(404, "User not Found!")); // Custom error if username is not found

    const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong Password or username!"));

    res.status(200).json(existingUser);
  } catch (err) {
    next(err);
  }
};
