const Direction = require("../../constant/enumsFogCloud");

var SubscriberConfigObject = require("./domain/SubscriberConfigObject");
var { subscriber } = require("./domain/Subscriber");

const cloudConfig = require("./cloud/configuration");
const fogConfig = require("./fog/configuration");

var { createTopics } = require("./domain/CreateTopics");
var CreateTopicObject = require("./domain/CreateTopicObject");

function connectCOAP() {
  createFogTopics();
  // createCloudTopics();

  fogSubscribe();
  cloudSubscribe();
}

function createFogTopics() {
  const config = new CreateTopicObject(
    fogConfig.publish_connection,
    fogConfig.topics
  );
  createTopics(config);
}

function createCloudTopics() {
  const config = new CreateTopicObject(
    cloudConfig.publish_connection,
    cloudConfig.topics
  );
  createTopics(config);
}

function fogSubscribe() {
  const configuration = new SubscriberConfigObject(
    fogConfig.subscribe_connection,
    Direction.TO_CLOUD      //Direction is to FOG but this param is used after subscriptioin
  );
  subscriber(configuration);
}

function cloudSubscribe() {
  const configuration = new SubscriberConfigObject(
    cloudConfig.subscribe_connection,
    Direction.TO_FOG
  );
  subscriber(configuration);
}

module.exports = {
  coapInit: () => connectCOAP(),
};
