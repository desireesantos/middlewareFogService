var Connection = require("./Connection");

const Protocol = require("../../../constant/enumsProtocols");
var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();

class CoapConnection extends Connection {
  constructor(newConfiguration) {
    super();
    this.coapClient = this.getcoapClient();
    this.configuration = newConfiguration;
    this.createTopics();
  }

  createTopics() {
    this.configuration.topics.map((pathname) => {
      var request = this.coapClient.request(this.buildOptions(pathname));
      request.write(JSON.stringify(`message to ${pathname}`));
      request.on("response", (resp) => {
        console.log("Got response:", resp.code, resp.payload.toString());
      });
      request.end();
    });
  }

  buildOptions(pathname) {
    return Object.assign(this.configuration.options, { pathname });
  }

  translateData(data) {
    const dataToSend = buildData(
      Protocol.COAP,
      Buffer.from(data).toString(),
      this.configuration.directions
    );
    translator.build(dataToSend);
  }

  subscribeTopic() {
    var request = this.coapClient.request(this.configuration.subscribe);
    var self = this;
    request.on("response", function (res) {
      res.on("data", function (data) {
        self.translateData(data);
      });
      res.on("end", function () {
        console.log("Success");
      });
    });
    request.end();
  }
}

module.exports = CoapConnection;
