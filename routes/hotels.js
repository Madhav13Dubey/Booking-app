import express from "express";
import hotel from "./models/hotel.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "./controllers/hotel.js";
const router = express.Router();
// CREATE //
router.post("/", createHotel);
//UPDATE//
router.put("/:id", updateHotel);
//DELETE//
router.delete("/:id", deleteHotel);
//GET//
router.get("/:id", getHotel);
//GET ALL//
router.get("/", getHotels);
    
  //const failed = true;
    // ways that we can do and write anything regarding error and display anything //
    /*const err = new Error();
    err.status = 404;
    err.message = "Sorry not found!";
    if (failed) return next(err); */
   
   // if (failed) return next(createError(401, "You are not authenticated!")); //
   
export default router;