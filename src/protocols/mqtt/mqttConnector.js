var mqtt = require("mqtt");
const {BROKER_URL, TOPIC_SUBSCRIB} = require("./configuration")

class MqttConnector {
  
  constructor(brokerURL= BROKER_URL) {
    client = mqtt.connect(brokerURL);
  }
}

client.on("connect", function () {
  client.subscribe(TOPIC_SUBSCRIB);

  client.on("message", function (topic, message, packet) {
    console.log("Received '" + message + "' on '" + topic + "'");
  });
});
