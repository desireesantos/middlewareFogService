var fogbroker = require("./fog/subscribeFromFog");
var cloudBroker = require("./cloud/subscribeFromCloud");

function connectMQTT() {
  console.log("Start MQTT connection FOG");
  fogSubscribe();

  console.log("Start MQTT connection CLOUD");
  cloudSubscribe();
}

function fogSubscribe() {
  fogbroker.subscribeTopic();
}

function cloudSubscribe() {
  cloudBroker.subscribeTopic();
}

module.exports = {
  mqttInit: () => connectMQTT(),
  mqttClient: () => mqtt,
};
