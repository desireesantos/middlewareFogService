var { initClient } = require("./mqtt/initializerMQTT");

class InitializerIoTProtocols {
  constructor() {
    initClient();
  }
}

module.exports = InitializerIoTProtocols;
