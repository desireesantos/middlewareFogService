const Direction = require("../../../constant/enumsFogCloud");

class CoapSetup {
  constructor(topics, options, subscribe) {
    this.topics = topics;
    this.options = options;
    this.publish = options;
    this.subscribe = subscribe;
    this.directions = Direction.TO_CLOUD;
  }
}

module.exports = CoapSetup;
