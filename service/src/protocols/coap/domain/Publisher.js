var coap = require("coap");

function publishTopic(data, config) {
  var req = coap.request(config.publish);

  payload = {
    'message': data.message,
    'date': data.date.concat(`, ${new Date().toISOString()}`)
  }

  req.write(JSON.stringify(payload));

  req.on("response", function (res) {
    res.on("data", function (data) {
      console.log("CoaP publish ", data);
    });
    res.on("end", function () {
      // console.log("Success Coap Publish");
    });
  });
  req.end();
}

module.exports = {
  publishMessage: (message, config) => publishTopic(message, config),
};
