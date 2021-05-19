const Protocol = require("../constant/enumsProtocols");
var { publishToCloud } = require("../protocols/mqtt/cloud/publishToCloud");
var { publishToFog } = require("../protocols/mqtt/fog/publishToFog");

class Translator {
  constructor() {}

  build(dataToTransport) {
    const { message, protocol, isDataToCloud } = dataToTransport;
    if (!protocol | !message) {
      throw new Error("Translator not well defined");
    }
    switch (protocol) {
      case Protocol.MQTT:
        isDataToCloud ? publishToCloud(message) : publishToFog(message);
        break;

      case Protocol.COAP:
        console.log("COAP");
        break;
    }
  }
}

module.exports = Translator;
