var coap = require("coap");
const {LocalStorage} = require('node-localstorage'); 
const bestProtocolConfiguration = require("./configuration");
const {BEST_PROTOCOL} = require('../../constant/enumsProtocols');
var localStorage = new LocalStorage('./scratch'); 

class BestProtocol {
  constructor () {
    this.getNotificationBestProtocol();
  }

 bestProtocol = '';
  
 getNotificationBestProtocol() {
    var request = coap.request(bestProtocolConfiguration);

    request.on("response", function (res) {
      res.on("data", function (data) {

        this.bestProtocol = data.toString();

        localStorage.setItem(BEST_PROTOCOL, this.bestProtocol)
        return { bestProtocol : function() { return this.bestProtocol } };
      });
      res.on("end", function () {
        console.log("Success");
      });
    });
    request.end();
 }
}

module.exports = BestProtocol;