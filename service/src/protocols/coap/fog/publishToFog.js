var coap = require("coap");
var { publish_connection } = require("./configuration");
var { writeFile } = require("./../../../entities/file/writeContent")

function publishTopic(payload) {

  var req = coap.request(publish_connection);
  req.setOption('Block1', Buffer.alloc(0x6))

  const payloadFromFogTo = {
    'message': payload.message,
    'date': payload.date.concat(`, ${new Date().toISOString()}`)
  }

  req.write(JSON.stringify(payloadFromFogTo));

  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP publish ", data);
    });
    res.on("end", function () {
      console.log("Finish Coap Publish");
    });
  });
  req.end();

  writeFile(payloadFromFogTo.date);
}

module.exports = {
  publish: (data) => publishTopic(data),
};
