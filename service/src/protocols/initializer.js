var { mqttInit } = require("./mqtt/initializerMQTT");
var { coapInit } = require("./coap/initializerCOAP");


function start() {
  // mqttInit();
  coapInit();
}

module.exports = {
  startProtocols: () => start(),
};
