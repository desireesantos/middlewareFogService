var fogServer = require("./fog/subscribeFromFog");
var CoapConnection = require("./domain/CoapConnection");
const {
  topics,
  publish_connection,
  subscribe_connection,
} = require("./cloud/configuration");
var CoapSetup = require("./domain/CoapSetup");

function connectCOAP() {
  // console.log("Start CoAP connection FOG");
  // _fogSubscribe();

  console.log("Start CoAP connection CLOUD");
  _cloudSubscribe();
}

function _fogSubscribe() {
  fogServer.subscribe();
}

function _cloudSubscribe() {
  coapCloudSetup = new CoapSetup(
    topics,
    publish_connection,
    subscribe_connection
  );
  cloud = new CoapConnection(coapCloudSetup);
  cloud.subscribeTopic();
}

module.exports = {
  coapInit: () => connectCOAP(),
};
