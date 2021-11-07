var coap = require("coap");
var { publish_connection } = require("./configuration");
var {writeContentFile} = require("./../../../entities/file/writeContent")
const Protocols = require('../../../constant/enumsProtocols')

function publishTopic(payload) {
  var req = coap.request(publish_connection);

  payloadFromFogTo = {
    'message': payload.message,
    'date': payload.date.concat(`, ${new Date().toISOString()}`)
  }

  req.write(JSON.stringify(payload));
  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP sent to Fog -", Buffer.from(data).toString());
      writeContentFile(`${Protocols.AMQP}, ${payload.date}`);
    });
    res.on("end", function () {
      // console.log("Success Coap Publish to Fog");
    });
  });
  req.end();
}

module.exports = {
  publish: (data) => publishTopic(data),
};
