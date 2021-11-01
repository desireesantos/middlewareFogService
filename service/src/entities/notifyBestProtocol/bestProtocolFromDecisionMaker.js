var coap = require("coap");
var { subscribe_connection } = require("./configuration");

class BestProtocol {
  constructor () {
    var t = this.initialize();
    console.log("+++++++++++++++++++++++++++++++++++", this.initialize())
  }

 bestProtocol = '';
  
 initialize() {
    var request = coap.request(subscribe_connection);

    request.on("response", function (res) {
      res.on("data", function (data) {
        // console.log("Best Protocol: ", data.toString());
        this.bestProtocol = data.toString();
        console.log("Best Protocol: ", this.bestProtocol);
        return {
          bestProtocol : function() { return this.bestProtocol },
        };

      });
      res.on("end", function () {
        console.log("Success");
      });
    });
    request.end();
 }

}

module.exports = BestProtocol;