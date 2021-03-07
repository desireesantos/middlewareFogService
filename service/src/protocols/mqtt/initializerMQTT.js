var mqtt = require("mqtt");
var { BROKER_URL } = require("./configurationMQTT");

function mqttClient() {
  console.log("MQTT init");
  return mqtt.connect(BROKER_URL);
}

module.exports = {
  initClient: () => mqttClient(),
  mqttClient: () => mqtt,
};
