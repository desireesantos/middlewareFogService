var AWS = require("aws-sdk");
AWS.config.update(
  { region: "sa-east-1",
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey' });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const config = require("./configuration");

let sendMessageToCloud = (message) => {
  var params = {
    DelaySeconds: config.DELAY_SECONDS,
    QueueUrl: config.QUEUE_URL_PUBLISH,
    MessageBody: message,
  };

  sqs.sendMessage(params, function (err, data) {
    console.log("--- PUBLISH TO CLOUD --- ");

    if (err) {
      console.log("Receive Error", err);
    } else {
      console.log("Success Message to Cloud - ", data);
    }
  });
};

module.exports = {
  publish: (data) => sendMessageToCloud(data),
};
