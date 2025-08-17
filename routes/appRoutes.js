const express = require("express");
const router = express.Router();

const meterController = require("../controllers/meterController");
const meterController2 = require("../controllers/meterController2");

router.post('/Meter/create', meterController.createMeterPower);

router.get('/MetricList', meterController.MeterList);

router.put('/Meter/:id/update', meterController.Meter_update);

router.post('/RelayControl/create', meterController.createRelayControl);

router.get('/RelayOptions', meterController.relayList);

router.put('/RelayControl/:id/update', meterController.relayControlUpdate);

router.delete('/Relaydelete/:id', meterController.relaydelete);

router.post('/createMetric/', meterController2.createrMetric);

module.exports = router