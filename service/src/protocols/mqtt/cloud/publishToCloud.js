var AWS = require("aws-sdk");
AWS.config.update(
  { region: "sa-east-1",
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey' });
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const config = require("./configuration");

let sendMessageToCloud = (data) => {
  var payload = {
    'message': data.message,
    'date': data.date.concat(`, ${new Date().toISOString()}`)
  }

  var params = {
    DelaySeconds: config.DELAY_SECONDS,
    QueueUrl: config.QUEUE_URL_PUBLISH,
    MessageBody: payload,
  };

  sqs.sendMessage(params, function (err, data) {
    console.log("--- PUBLISH TO CLOUD MQTT--- ");

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
