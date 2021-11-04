var mqtt = require("mqtt");
var { TOPIC_PUBLISH, FOG_BROKER_URL } = require("./configuration");

function sendMessageToFog(data) {
 const options = {
    host: FOG_BROKER_URL,
    qos: data.qos,
  };
  var mqttClient = mqtt.connect(options);

  payload = {
    message: Buffer.from(data.message).toString(),
    date: data.date.concat(`, ${new Date().toISOString()}`)
  }

  mqttClient.publish(TOPIC_PUBLISH, payload + " -- back to Edge");
}

module.exports = {
  publish: (data) => sendMessageToFog(data),
};
