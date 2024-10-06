import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {                // Initial Connection //
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connect to mongoDB.")
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
 app.get("/", (req,res)=>{    // "/" means globally accessible by any localhost, req -> request, res-> response //
    res.send("hello first request!")
 })

mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected!");
})

mongoose.connection.on("connected", ()=> {
    console.log("mongoDB connected!");
})

// express middleware to convert json into read and writeable format//
app.use(express.json())
// express Middlewares //
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

//Node js middlewares //        // as above middleware express.json() makes an api call for hotels becoz we are doing work in hostels.js so, it will print console statement of node js middleware and after printing it goes to next(), (it into the get all) and prints i'm a middleware from hostels.js//
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,              // gives more details about the error occur //
  })
})
app.listen(8000, () => {
    connect()
    console.log("Connected to backend!");
});