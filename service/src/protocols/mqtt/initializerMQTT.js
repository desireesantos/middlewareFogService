var mqtt = require("mqtt");
var { FOG_BROKER_URL } = require("./fog/configuration");
var fogbroker = require("./fog/subscribeFromFog");
var cloudBroker = require("./cloud/subscribeFromCloud");

function connectMQTT() {
  console.log("Start MQTT connection FOG");
  _fogSubscribe();

  console.log("Start MQTT connection CLOUD");
  _cloudSubscribe();
}

function _fogSubscribe() {
  var client = mqtt.connect(FOG_BROKER_URL);
  fogbroker.subscribeTopic(client);
}

function _cloudSubscribe() {
  cloudBroker.subscribeTopic();
}

module.exports = {
  mqttInit: () => connectMQTT(),
  mqttClient: () => mqtt,
};
