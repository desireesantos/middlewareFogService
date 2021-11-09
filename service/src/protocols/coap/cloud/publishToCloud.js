const setup = require("./configuration");
var { publishMessage } = require("../domain/Publisher");
var PublisherConfigObject = require("./../domain/PublisherConfigObject");
const config = new PublisherConfigObject(setup.setupCloudPublish());

function publishTopic(message) {
  publishMessage(message, config.publish);
}

module.exports = {
  publishTopic: (message) => publishTopic(message),
};
