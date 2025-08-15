const Meter = require("../models/metermodel");
const Relay = require("../models/relayControl");

const asyncHandler = require("express-async-handler");

exports.createMeterPower = asyncHandler(async function(req, res, next){
    try{
        const {power1, power2, power3, timestamp, createdAt} = req.body;
        if(power1 == null || power2 == null || power3 == null ){
            res.status(400).json({error: "power1 or power 2 or power 3 are required"});
            return;
        }

        const meter = new Meter({
            power1,
            power2,
            power3,
            timestamp,
            createdAt: new Date()
        });

        const savedMeter = await meter.save();
        res.status(201).json(savedMeter);

    }catch(error){
        next(error);
    }
});

exports.MeterList = asyncHandler(async function(req, res, next){
    try {
        const allMetric = await Meter.find().exec();
        res.json(allMetric)

    } catch (error) {
            next(error);        
    }
});

exports.Meter_update = asyncHandler(async function(req, res, next){
    try {
        const{power1, power2, power3, timestamp, createdAt} = req.body;
        const meter_update = await Meter.findByIdAndUpdate(
            req.params.id,
            {power1, power2, power3, timestamp, createdAt},
            {new:true, runValidators:true}
        );

        if(!meter_update){
            res.status(404).json({error:"Metric not found"});
        }

        const savedUpdate = await meter_update.save()
        res.status(201).json(savedUpdate);

    } catch (error) {
        
    }
});

exports.createRelayControl = asyncHandler(async function(req, res, next){
    try {
        const{relay1, relay2, relay3} = req.body;

        const RelayControl = new Relay({
            relay1,
            relay2,
            relay3
        });

        const savedControl = await RelayControl.save();
        res.status(201).json(savedControl);

    } catch (error) {
        next(error);
    }
});

exports.relayControlUpdate = asyncHandler(async function(req, res, next){
    try {
        const {relay1, relay2, relay3} = req.body;

        const controlupdate = await Relay.findByIdAndUpdate(
            req.params.id,
            {relay1, relay2, relay3},
            {new:true, runValidators:true}
        );

        if (!controlupdate){
            res.status(404).json({error:"relay control not found"});
        }

        const savedUpdate = await controlupdate.save();
        res.status(201).json(savedUpdate);
    } catch (error) {
        next(error);
    }
});

exports.relaydelete = asyncHandler(async function(req, res, next) {
    try {
        const relay_delete = await Relay.findByIdAndDelete(req.params.id);
        if(!relay_delete){
            res.status(404).json({error:"this object is not available"});
        }
        res.status(201).json({message:"this object has been deleted"})
    } catch (error) {
        
    }
})

exports.relayList = asyncHandler(async function(req, res, next){
    try {
        const allrelayOptions = await Relay.find().exec();
        res.json(allrelayOptions);
    } catch (error) {
        next(error);
    }
});