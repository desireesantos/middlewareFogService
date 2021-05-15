var { TOPIC_SUBSCRIB } = require("./configuration");
var Translator = require("../../../entities/translator");
var { buildData } = require("../../../entities/dataToTransport");
const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var translator = new Translator();

function getDataFromFrog(mqtt) {
  mqtt.on("connect", function () {
    console.log("--- CONNECTED --- ");

    mqtt.subscribe(TOPIC_SUBSCRIB);
    mqtt.on("message", function (topic, message) {
      console.log("[Received] topic: " + topic.toString());
      console.log("[Received] message: " + message.toString());

      const dataToSend = buildData(
        Protocol.MQTT,
        message.toString(),
        Direction.TO_FOG
      );
      translator.build(dataToSend);
    });
  });
}

module.exports = {
  subscribeTopic: (mqttClient) => getDataFromFrog(mqttClient),
};
