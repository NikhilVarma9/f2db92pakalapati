const mongoose = require("mongoose") 
const bikeSchema = mongoose.Schema({ 
 bike_type: String, 
 model: String, 
 cost: Number 
}) 
 
module.exports = mongoose.model("bike", bikeSchema) 