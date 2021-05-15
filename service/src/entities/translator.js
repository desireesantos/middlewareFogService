const Protocol = require("../constant/enumsProtocols");
var { publishToCloud } = require("../protocols/mqtt/cloud/publishToCloud");

class Translator {
  constructor() {}

  build(dataToTransport) {
    const { message, protocol, isDataToCloud } = dataToTransport;
    if (!protocol | !message) {
      throw new Error("Translator not well defined");
    }
    switch (protocol) {
      case Protocol.MQTT:
        console.log("MQTT");
        isDataToCloud ? publishToCloud(message) : () => {};
        break;

      case Protocol.COAP:
        console.log("COAP");
        break;
    }
  }
}

module.exports = Translator;
