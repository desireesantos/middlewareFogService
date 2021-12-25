var coap = require("coap");

function publishTopic(data, config) {
  var req = coap.request(config);
  req.setOption('Block1', Buffer.alloc(0x6))

  const payload = {
    'message': data.message,
    'date': data.date.concat(`, ${new Date().toISOString()}`)
  }
  console.log(payload)
  req.write(JSON.stringify(payload));

  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP publish ", data);
    });
    res.on("end", function () {
      console.log("Finish Coap Publish");
    });
  });
  req.end();
}

module.exports = {
  publishMessage: (message, config) => publishTopic(message, config),
};
