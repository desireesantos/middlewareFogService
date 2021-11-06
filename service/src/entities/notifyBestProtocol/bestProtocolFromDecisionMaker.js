var coap = require("coap");
var { subscribe_connection } = require("./configuration");
const {LocalStorage} = require('node-localstorage'); 
var localStorage = new LocalStorage('./scratch'); 
const {BEST_PROTOCOL} = require('../../constant/enumsProtocols');

class BestProtocol {
  constructor () {
    this.initialize();
  }

 bestProtocol = '';
  
 initialize() {
    var request = coap.request(subscribe_connection);

    request.on("response", function (res) {
      res.on("data", function (data) {
        this.bestProtocol = data.toString();
        localStorage.setItem(BEST_PROTOCOL, this.bestProtocol)
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