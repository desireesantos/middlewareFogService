const { publish_connection } = require("./configuration");
var { publishMessage } = require("../domain/Publisher");
var PublisherConfigObject = require("./../domain/PublisherConfigObject");
const config = new PublisherConfigObject(publish_connection);

function publishTopic(message) {
  publishMessage(message, config);
}

module.exports = {
  publishTopic: (message) => publishTopic(message),
};
