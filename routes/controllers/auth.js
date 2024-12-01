import bcrypt from "bcryptjs";
import UserSchema from "../models/user.js";
// const createError = require('http-errors');

export const register = async(req,res,next)=>{
    try{                            // bcryptjs is used to to hashed the password which is more secured by ordinary password //  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      await newUser.save();          // provide more security to password//
      res.status(200).send("User has been created!");
      db.createUser(newUser, writeConcern);
    }catch(err){
        next(err);
    }
};

export const login = async(req,res,next)=>{
    // try{                
    //     console.log("aha");           
    //     const user = await UserSchema.findOne({username:req.body.username});
    //     if (!user) return next(createError(404, "User not Found!"));           // Custom error if searched usename is not found //

    //     const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    //     if(!isPasswordCorrect) return next(createError(400, "Wrong Password or username!"));
       
    //     res.status(200).json(user);
    // } catch(err) {
    //     next(err);
    // }

    try {
        // check if the user exists
        const usera = await UserSchema.findOne({ username: req.body.username });
      //  console.log(user);
        if (usera) {
          //check if password matches
          const result = req.body.password === usera.password;
         // console.log(result)
          if (result) {
            // console.log("Am in here");
            res.status(200).json(usera);
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
};