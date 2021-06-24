var mqtt = require("mqtt");
var { TOPIC_PUBLISH, FOG_BROKER_URL } = require("./configuration");

function sendMessageToFog(message) {
  var mqttClient = mqtt.connect(FOG_BROKER_URL);

  mqttClient.publish(TOPIC_PUBLISH, message + " -- back to Edge");
}

module.exports = {
  publish: (data) => sendMessageToFog(data),
};
