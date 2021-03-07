const Protocol = require("../constant/enumsProtocols");
const { subscribe } = require("../protocols/mqtt/mqttBuilder");

class Translator {
  constructor(payload, currentProtocol) {
    if (!currentProtocol | !payload) {
      throw new Error("Translator not well defined");
    }
    this._payload = payload;
    this._protocol = currentProtocol.toLowerCase();
    this.build();
  }

  build() {
    switch (this._protocol) {
      case Protocol.MQTT:
        console.log("MQTT");
        subscribe();
        break;

      case Protocol.COAP:
        console.log("COAP");
        break;
    }
  }
}

module.exports = Translator;
