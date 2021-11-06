var coap = require("coap");
var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();

function subscribeTopic(config) {
  var request = coap.request(config.subscribe);
  // request.setOption("Block2", Buffer.of(0x2));

  request.on("response", function (res) {
    res.on("data", function (data) {

      translateData(data, config);
    });
    res.on("end", function () {
      console.log("Success");
    });
  });
  request.end();
}

function translateData(data, config) {
  //EdgeToFog
  payloadFromEdgeToFog = {
    message: Buffer.from(data).toString(),
    date: new Date().toISOString()
  }
  const dataToSend = buildData(
    config.protocol,
    payloadFromEdgeToFog,
    config.direction
  );
  translator.build(dataToSend);
}

module.exports = {
  subscriber: (config) => subscribeTopic(config),
};
