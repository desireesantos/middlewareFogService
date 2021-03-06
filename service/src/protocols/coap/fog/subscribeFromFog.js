var coap = require("coap");
const { subscribe_connection } = require("./configuration");
const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();

function subscribeTopic() {
  var request = coap.request(subscribe_connection);

  request.on("response", function (res) {
    res.on("data", function (data) {
      translateData(data);
    });
    res.on("end", function () {
      console.log("Success");
    });
  });
  request.end();
}

function translateData(data) {
  const dataToSend = buildData(
    Protocol.COAP,
    Buffer.from(data).toString(),
    Direction.TO_CLOUD
  );
  translator.build(dataToSend);
}

module.exports = {
  subscribe: () => subscribeTopic(),
};
