var coap = require("coap");

class Connection {
  constructor() {
    if (this.coapClient == null) {
      console.log("New coap instance was generated");
      this.coapClient = coap;
    }
  }

  getcoapClient() {
    return this.coapClient;
  }
}
module.exports = Connection;
