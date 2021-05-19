var { mqttInit } = require("./mqtt/initializerMQTT");

function start() {
  mqttInit();
}

module.exports = {
  startProtocols: start(),
};
