const Protocol = require("../constant/enumsProtocols");
var mqttCloud = require("../protocols/mqtt/cloud/publishToCloud");
var mqttFog = require("../protocols/mqtt/fog/publishToFog");
var coapFog = require("../protocols/coap/fog/publishToFog");
var coapCloud = require("../protocols/coap/cloud/publishToCloud");
class Translator {
  constructor() {}

  build(dataToTransport) {
    const { message, protocol, isDataToCloud } = dataToTransport;
    if (!protocol) {
      throw new Error("Translator not well defined");
    }
    switch (protocol) {
      case Protocol.MQTT:
        isDataToCloud ? mqttCloud.publish(message) : mqttFog.publish(message);
        break;

      case Protocol.COAP:
        isDataToCloud
          ? coapCloud.publishTopic(message)
          : coapFog.publish(message);
        break;
    }
  }
}

module.exports = Translator;
