var { TOPIC_SUBSCRIB } = require("./configuration");
const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var { buildData } = require("../../../entities/dataToTransport");

var Translator = require("../../../entities/translator");
var translator = new Translator();

function getDataFromFrog(mqtt) {
  mqtt.on("connect", function () {
    console.log("--- SUBSCRIBE FOG TOPIC --- ");

    mqtt.subscribe(TOPIC_SUBSCRIB);
    mqtt.on("message", function (topic, message) {
      console.log("[Received] topic: " + topic.toString());
      console.log("[Received] message: " + message.toString());

      const dataToSend = buildData(
        Protocol.MQTT,
        message.toString(),
        Direction.TO_CLOUD
      );
      translator.build(dataToSend);
    });
  });
}

module.exports = {
  subscribeTopic: (mqttClient) => getDataFromFrog(mqttClient),
};
