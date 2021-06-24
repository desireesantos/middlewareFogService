const config = require("./configuration");
const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
const https = require("https");

const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var { buildData } = require("../../../entities/dataToTransport");

var Translator = require("../../../entities/translator");
var translator = new Translator();

AWS.config.update({
  region: "sa-east-1",
  accessKeyId: "AKIAUVUUUIWJJ5QAYXWW",
  secretAccessKey: "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",
});

function getMessageFromCloud() {
  console.log("--- SUBSCRIBE CLOUD TOPIC --- ");

  const app = Consumer.create({
    queueUrl: config.QUEUE_URL_SUBSCRIBE,
    handleMessage: async (message) => {
      console.log("Message From Cloud - ", message.Body);

      const dataToSend = buildData(
        Protocol.MQTT,
        message.Body,
        Direction.TO_FOG
      );
      if (message != null || message != "") translator.build(dataToSend);
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
