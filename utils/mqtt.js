// utils/mqttClient.js
const mqtt = require("mqtt");
const powerData = require("../models/metermodel")

const brokerUrl = "1b0f688a41554518a4458f213018964a.s1.eu.hivemq.cloud:8883"; // Use public broker for now
const powerTopic = "smartmeter/power";   // ESP32 publishes power data
const relayTopic = "smartmeter/relay";   // ESP32 subscribes for relay commands

let lastPowerData = {}; // Store latest power readings

// Connect to broker
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe(powerTopic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${powerTopic}`);
    }
  });
});

// Handle incoming MQTT messages
client.on("message", async (topic, message) => {
  if (topic === powerTopic) {
    try {
      const data = JSON.parse(message.toString());
      lastPowerData = data;

      //saving data to the database
      const entry = new powerData(data);
      await entry.save();

      console.log(" Power Data Received:", data);
    } catch (err) {
      console.error(" Error parsing MQTT message:", err);
    }
  }
});

// Publish relay commands
function publishRelayCommand(relay1, relay2, relay3) {
  const command = JSON.stringify({ relay1, relay2, relay3 });
  client.publish(relayTopic, command);
  console.log(" Relay Command Sent:", command);
}

// Export functions and data
module.exports = {
  publishRelayCommand,
  getLastPowerData: () => lastPowerData,
};
