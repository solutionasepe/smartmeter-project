const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const meterSchema2 = new Schema({
    device_id : {type:String, required: true},
    voltage : {type:Number, required:true},
    current : {type:Number, required:true},
    power : {type:Number, required:true},
    total_unit : {type:Number, required:true},
    unit_low : {type:Boolean, required:true},
    relay_state : {type:Boolean, required:true},
    created_at : {type:Date, default:Date.now()}
});

module.exports = mongoose.model("meter2", meterSchema2)