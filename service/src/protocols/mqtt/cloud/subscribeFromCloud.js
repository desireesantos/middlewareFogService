const config = require("./configuration");
const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
const https = require("https");

AWS.config.update({
  region: "sa-east-1",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey",
});

function getMessageFromCloud() {
  const app = Consumer.create({
    queueUrl: config.QUEUE_URL_SUBSCRIBE,
    handleMessage: async (message) => {
      console.log("--->", message);
    },
    sqs: new AWS.SQS({
      httpOptions: {
        agent: new https.Agent({
          keepAlive: true,
        }),
      },
    }),
  });

  app.on("error", (err) => {
    console.error(err.message);
  });

  app.on("processing_error", (err) => {
    console.error(err.message);
  });

  app.start();
}

module.exports = {
  subscribeTopic: () => getMessageFromCloud(),
};
