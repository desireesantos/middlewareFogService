const Protocol = require("../../../constant/enumsProtocols");

class SubscriberConfigObject {
  constructor(subscribe, directions) {
    this.protocol = Protocol.COAP;
    this.subscribe = subscribe;
    this.direction = directions;
  }
}

module.exports = SubscriberConfigObject;
