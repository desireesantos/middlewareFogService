var coap = require("coap");
var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();
const DELIMITER = 'ts_sep_';

function subscribeTopic(config) {
  var request = coap.request(config.subscribe);
  // request.setOption("Block2", Buffer.of(0x2));

  request.on("response", function (res) {
    res.on("data", function (data) {

      translateData(data, config);
    });
    res.on("end", function () {
      // console.log("Success Coap Subscribe");
    });
  });
  request.end();
}

function translateData(data, config) {
  var payloadFromEdgeToFog = '';

  try {
    json = JSON.parse(data)
    payloadFromEdgeToFog = {
      'message': json.message ? Buffer.from(json.message).toString() : Buffer.from(data).toString(),
      'date': json.date ? json.date.concat(`, ${new Date().toISOString()}`) : ` ${new Date().toISOString()}`
    }
  } catch (error) {
   separedMessageDate = Buffer.from(data).toString().split(DELIMITER)
   dateTime = parseInt(separedMessageDate[0])
   stringdate = JSON.stringify(new Date(dateTime));

   payloadFromEdgeToFog = {
    'message': Buffer.from(data).toString(),
    'date': stringdate.concat(` , ${new Date().toISOString()}`)
   }
  }

  const dataToSend = buildData(
    config.protocol,
    payloadFromEdgeToFog,
    config.direction
  );
  if(config.subscribe.pathname == 'middlewareToFog') console.log("END OF DATA FLOW ", payloadFromEdgeToFog, 'CONFIG', config.subscribe)
  translator.build(dataToSend);
}

module.exports = {
  subscriber: (config) => subscribeTopic(config),
};
