var AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const config = require("./configuration");

let sendMessageToCloud = (message) => {
  var params = {
    DelaySeconds: config.DELAY_SECONDS,
    QueueUrl: config.QUEUE_URL_PUBLISH,
    MessageBody: message,
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else {
      console.log("Success Message to Cloud - ", data);
    }
  });
};

module.exports = {
  publishToCloud: (data) => sendMessageToCloud(data),
};
