const express = require("express");
const router = express.Router();

const meterController = require("../controllers/meterController");
const meterController2 = require("../controllers/meterController2");
const mqttcontroller = require("../controllers/mqttcontroller");

/**
 * @swagger
 * /Meter/create:
 *   post:
 *     summary: Create a new meter entry
 *     tags: [Meter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               power1:
 *                 type: number
 *               power2:
 *                 type: number
 *               power3:
 *                 type: number
 *               timestamp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Meter data created successfully
 *       500:
 *         description: Server error
 */
router.post('/Meter/create', meterController.createMeterPower);

/**
 * @swagger
 * /MetricList:
 *   get:
 *     summary: Get a list of metrics
 *     tags: [Meter]
 *     responses:
 *       200:
 *         description: List of metrics
 *       500:
 *         description: Server error
 */
router.get('/MetricList', meterController.MeterList);

/**
 * @swagger
 * /Meter/{id}/update:
 *   put:
 *     summary: Update a meter entry by ID
 *     tags: [Meter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The meter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               power1:
 *                 type: number
 *               power2:
 *                 type: number
 *               power3:
 *                 type: number
 *               timestamp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meter updated successfully
 *       404:
 *         description: Meter not found
 *       500:
 *         description: Server error
 */
router.put('/Meter/:id/update', meterController.Meter_update);

/**
 * @swagger
 * /RelayControl/create:
 *   post:
 *     summary: Create a new relay control entry
 *     tags: [RelayControl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               relay1:
 *                 type: number
 *               relay2:
 *                 type: number
 *               relay3:
 *                 type: number
 *               
 *     responses:
 *       201:
 *         description: Relay control created successfully
 *       500:
 *         description: Server error
 */
router.post('/RelayControl/create', meterController.createRelayControl);

/**
 * @swagger
 * /RelayOptions:
 *   get:
 *     summary: Get a list of relay options
 *     tags: [RelayControl]
 *     responses:
 *       200:
 *         description: List of relay options
 *       500:
 *         description: Server error
 */
router.get('/RelayOptions', meterController.relayList);

/**
 * @swagger
 * /RelayControl/{id}/update:
 *   put:
 *     summary: Update a relay control entry by ID
 *     tags: [RelayControl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The relay control ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               relay1:
 *                 type: number
 *               relay2:
 *                 type: number
 *               relay3:
 *                 type: number
 *     responses:
 *       200:
 *         description: Relay control updated successfully
 *       404:
 *         description: Relay control not found
 *       500:
 *         description: Server error
 */
router.put('/RelayControl/:id/update', meterController.relayControlUpdate);

/**
 * @swagger
 * /Relaydelete/{id}:
 *   delete:
 *     summary: Delete a relay control entry by ID
 *     tags: [RelayControl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The relay control ID
 *     responses:
 *       200:
 *         description: Relay control deleted successfully
 *       404:
 *         description: Relay control not found
 *       500:
 *         description: Server error
 */
router.delete('/Relaydelete/:id', meterController.relaydelete);

/**
 * @swagger
 * /createMetric:
 *   post:
 *     summary: Create a new metric entry
 *     tags: [Meter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *               voltage:
 *                 type: number
 *               current:
 *                 type: number
 *               power:
 *                 type: number
 *               total_unit:
 *                 type: number
 *               unit_low:
 *                 type: number
 *               relay_state:
 *                 type: number
 *               created_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Metric created successfully
 *       500:
 *         description: Server error
 */
router.post('/createMetric/', meterController2.createrMetric);
router.get("/power", mqttcontroller.getPowerData);
router.post("/relay", mqttcontroller.setRelayState);
router.get("/relay", mqttcontroller.getRelayState);


module.exports = router