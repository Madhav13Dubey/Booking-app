import hotel from "../models/hotel.js";
export const createHotel = async (req,res,next)=>{
    const newHotel = new hotel(req.body)

try{
  const savedHotel = await newHotel.save()
  res.status(200).json(savedHotel)
 }catch(err){
    next(err);
    }
};
//--------------------- UPDATE ----------------------- //
export const updateHotel = async (req,res,next)=>{
    try{
        const updatedHotel = await hotel.findByIdAndUpdate(req.params.id, { $set: req.body},{new:true});
        res.status(200).json(updatedHotel);
       }catch(err){
        next(err);
          }
      };
//-------------------------- DELETE ---------------------- //
export const deleteHotel = async (req,res,next)=>{
    try{
        await hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
       }catch(err){
        next(err);
          }
      };
//------------------------ GET ---------------------- //
export const getHotel = async (req,res,next)=>{
    try{
        const hotel = await hotel.findById(req.params.id);
        res.status(200).json(hotel);
          }catch(err){
            next(err);
             }
         };
//--------------------- GET ALL ------------------------- //
export const getHotels = async (req,res,next)=>{
    try{
        const hotels = await hotel.find();
        res.status(200).json(hotels);
       }catch(err){
          //res.status(500).json(err);//
          next(err);
          }
      };




