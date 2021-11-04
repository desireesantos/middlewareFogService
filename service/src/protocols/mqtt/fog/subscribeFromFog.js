var mqtt = require("mqtt");
var { TOPIC_SUBSCRIB, FOG_BROKER_URL } = require("./configuration");
const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var { buildData } = require("../../../entities/dataToTransport");

var Translator = require("../../../entities/translator");
var translator = new Translator();

function getDataFromFrog() {
  var client = mqtt.connect(FOG_BROKER_URL);

  client.on("connect", function () {
    console.log("--- SUBSCRIBE FOG TOPIC --- ");

    client.subscribe(TOPIC_SUBSCRIB);
    client.on("message", function (topic, message) {
      console.log("[Received] topic: " + topic.toString());
      console.log("[Received] message: " + message.toString());

      payload = {
        message: Buffer.from(message).toString(),
        date: new Date().toISOString()
      }

      const dataToSend = buildData(
        Protocol.MQTT,
        payload,
        Direction.TO_CLOUD
      );
      translator.build(dataToSend);
    });
  });
}

module.exports = {
  subscribeTopic: () => getDataFromFrog(),
};
