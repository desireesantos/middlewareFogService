var { initClient, mqttClient } = require("./initializerMQTT");

var { TOPIC_SUBSCRIB } = require("./configurationMQTT");

function subscribeTopic() {
  mqttClient = initClient();

  mqttClient.on("connect", function () {
    console.log("--- CONNECTED --- ");

    mqttClient.subscribe(TOPIC_SUBSCRIB);
    mqttClient.on("message", function (topic, message) {
      console.log("[Received] topic: " + topic.toString());
      console.log("[Received] message: " + message.toString());
    });
  });
}

module.exports = {
  subscribe: () => subscribeTopic(),
};
