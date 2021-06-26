var coap = require("coap");

function publishTopic(message, config) {
  var req = coap.request(config.publish);
  req.write(message);
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
