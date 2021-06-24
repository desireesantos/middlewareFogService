var coap = require("coap");
var { publish_connection } = require("./configuration");

function publishTopic(message) {
  var req = coap.request(publish_connection);

  req.write(JSON.stringify(message));
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
  publishTopic: (data) => publishTopic(data),
};
