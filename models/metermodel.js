const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const meterSchema = new Schema({
    power1 : {type:Number, required:true},
    power2 : {type:Number, required:true},
    power3 : {type:Number, require:true},
    timestamp: {type:String},
    createdAt : {type:Date, default:Date.now()}
})

module.exports = mongoose.model("meter", meterSchema);