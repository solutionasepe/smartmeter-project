// utils/mqttClient.js
const mqtt = require("mqtt");
const powerData = require("../models/metermodel")


const brokerUrl = "mqtts://1b0f688a41554518a4458f213018964a.s1.eu.hivemq.cloud:8883"; 
const powerTopic = "smartmeter/power";   // ESP32 publishes power data
const relayTopic = "smartmeter/relay";   // ESP32 subscribes for relay commands

let lastPowerData = {}; // Store latest power readings
let currentRelayState = { relay1: 0, relay2: 0, relay3: 0 }; // default OFF

// Connect to HiveMQ Cloud with authentication
const options = {
  clientId: "node_backend_01",          // give your backend client a unique ID
  username: process.env.MQTT_USERNAME,  // store in .env for security
  password: process.env.MQTT_PASSWORD,
  clean: true,   // ensures fresh session
  reconnectPeriod: 5000, // auto reconnect every 5s if dropped
};

const client = mqtt.connect(brokerUrl, options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  client.subscribe(powerTopic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${powerTopic}`);
    }
  });
  // Periodically republish current relay state (keep ESP in sync)
  setInterval(() => {
    client.publish(relayTopic, JSON.stringify(currentRelayState));
    console.log("🔄 Relay state refreshed:", currentRelayState);
  }, 5000); // every 5s

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
  currentRelayState = { relay1, relay2, relay3 };
  const command = JSON.stringify(currentRelayState);
  client.publish(relayTopic, command);
  console.log("📢 Relay Command Sent:", command);
}
// Export functions and data
module.exports = {
  publishRelayCommand,
  getLastPowerData: () => lastPowerData,
  getRelaystate: () => currentRelayState 
};
