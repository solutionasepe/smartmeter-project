const Meter2 = require("../models/meter2Model");

const asyncHandler = require("express-async-handler");

exports.createrMetric = asyncHandler(async function(req, res, next){
    try {

        const {device_id, voltage, current, power, total_unit, unit_low, relay_state, created_at} = req.body;
        if(device_id==null || voltage==null || current==null || power==null || total_unit==null || unit_low==null || relay_state==null){
            res.status(400).json({error: "one of your metric was not added or wrong data type"});
            return;
        }

        const meter2 = new Meter2({
            device_id,
            voltage,
            current,
            power,
            total_unit,
            unit_low,
            relay_state,
            created_at: new Date()
        });

        const savedMetric = await meter2.save();
        res.status(201).json(savedMetric);
        
    } catch (error) {
        next(error);
    }
})