const Protocol = require("../constant/enumsProtocols");
var mqttCloud = require("../protocols/mqtt/cloud/publishToCloud");
var mqttFog = require("../protocols/mqtt/fog/publishToFog");
var coapFog = require("../protocols/coap/fog/publishToFog");
var coapCloud = require("../protocols/coap/cloud/publishToCloud");
const {BEST_PROTOCOL} = require('../constant/enumsProtocols')

const {LocalStorage} = require('node-localstorage'); 
var localStorage = new LocalStorage('./scratch'); 
class Translator {
  constructor() {}

  build(dataToTransport) {
    const { message, protocol, isDataToCloud } = dataToTransport;

    var bestProtocol = this.getRightProtocolBasedDataFlow(isDataToCloud, protocol);

    if (!bestProtocol || !message) {
      throw new Error("Translator not well defined");
    }
    switch (bestProtocol) {
      case bestProtocol.includes(Protocol.MQTT):
        if (isDataToCloud) {
          mqttCloud.publish(message);
        }
        else {
          data = { message, qos: this.getQoSFromProtocolName(bestProtocol) }
          mqttFog.publish(data);
        }
        break;

      case Protocol.COAP:
        isDataToCloud
          ? coapCloud.publishTopic(message)
          : coapFog.publish(message);
        break;
    }
  }

  getBestProtocol(protocol) {
    if(localStorage.getItem(BEST_PROTOCOL).toLocaleLowerCase() != protocol) console.log('--- DEPOIS ->', localStorage.getItem(BEST_PROTOCOL).toLocaleLowerCase(), '--- ANTES: ->', protocol)
    return localStorage.getItem(BEST_PROTOCOL) ? localStorage.getItem(BEST_PROTOCOL) : protocol;
  }

  getQoSFromProtocolName(protocolName) {
    extractOnlyNumbers = '/[0-9]/';
    return extractOnlyNumbers.exec(protocolName)[0]   
  }

  getRightProtocolBasedDataFlow(isDataToCloud, protocol){
    return isDataToCloud ? this.getBestProtocol(protocol) : protocol;
  }
}

module.exports = Translator;
