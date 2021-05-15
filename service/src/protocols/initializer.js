var { initMQTTConnections } = require("./mqtt/initializerMQTT");

function start() {
  initMQTTConnections();
}

module.exports = {
  startProtocols: start(),
};
