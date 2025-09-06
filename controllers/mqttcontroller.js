// controllers/smartMeterController.js
const { publishRelayCommand, getLastPowerData } = require("../utils/mqtt");
const RelayState = require("../models/relayControl")

// Get latest power readings
exports.getPowerData = (req, res) => {
  res.status(200).json(getLastPowerData());
};

// Send relay control command
exports.setRelayState = async (req, res) => {
  const { relay1, relay2, relay3 } = req.body;

  const newState = await publishRelayCommand(relay1, relay2, relay3);

  res.status(201).json({
    status: "success",
    message: "Relay command published",
    command: newState,
  });
};

// Get current relay state (last saved in DB)
exports.getRelayState = async (req, res) => {
  try {
    const latest = await RelayState.findOne().sort({ timestamp: -1 }).exec();
    res.json({
      status: "success",
      relayState: latest || { relay1: 0, relay2: 0, relay3: 0 },
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};