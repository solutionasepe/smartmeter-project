// controllers/smartMeterController.js
const { publishRelayCommand, getLastPowerData } = require("../utils/mqtt");

// Get latest power readings
exports.getPowerData = (req, res) => {
  res.status(200).json(getLastPowerData());
};

// Send relay control command
exports.setRelayState = (req, res) => {
  const { relay1, relay2, relay3 } = req.body;

  publishRelayCommand(relay1, relay2, relay3);

  res.status(201).json({
    status: "success",
    message: "Relay command published",
    command: { relay1, relay2, relay3 },
  });
};
