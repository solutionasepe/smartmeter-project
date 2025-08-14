const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const relaySchema = new Schema({
    relay1 : {type:Number},
    relay2 : {type:Number},
    relay3 : {type:Number}
})

module.exports = mongoose.model("relaySchema", relaySchema);