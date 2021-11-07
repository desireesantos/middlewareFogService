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
  accessKeyId: "",
  secretAccessKey: "",
});

function getMessageFromCloud() {
  console.log("--- SUBSCRIBE CLOUD TOPIC --- ");

  const app = Consumer.create({
    queueUrl: config.QUEUE_URL_SUBSCRIBE,
    handleMessage: async (message) => {
      console.log("Message From Cloud - ", message.Body);

      payload = {
        'message': Buffer.from(message.Body.message).toString(),
        'date': message.Body.date.concat(`, ${new Date().toISOString()}`)
      }

      const dataToSend = buildData(
        Protocol.MQTT,
        payload,
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
