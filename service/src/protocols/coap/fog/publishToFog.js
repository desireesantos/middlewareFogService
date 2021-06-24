var coap = require("coap");
var { publish_connection } = require("./configuration");

function publishTopic(message) {
  var req = coap.request(publish_connection);

  req.write(JSON.stringify(message));
  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP sent to Fog -", Buffer.from(data).toString());
    });
    res.on("end", function () {
      console.log("Success");
    });
  });
  req.end();
}

module.exports = {
  publish: (data) => publishTopic(data),
};
