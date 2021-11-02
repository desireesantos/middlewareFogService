const { startProtocols } = require("../protocols/initializer");
var BestProtocol = require("./../entities/notifyBestProtocol/bestProtocolFromDecisionMaker")

var protocol = new BestProtocol();

function start () {
  startProtocols();
}

exports.getBestProtocol = function () {
  return protocol.bestProtocol
}

module.exports = {
  start: () => start(),
}