var coap = require("coap");

function publishTopic(data, config) {
  var req = coap.request(config.publish);
  payload = {
    message: Buffer.from(data.message).toString(),
    date: data.date.concat(`, ${new Date().toISOString()}`)
  }
  req.write(payload);
  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP publish ", Buffer.from(data).toString());
    });
    res.on("end", function () {
      console.log("Success");
    });
  });
  req.end();
}

module.exports = {
  publishMessage: (message, config) => publishTopic(message, config),
};
