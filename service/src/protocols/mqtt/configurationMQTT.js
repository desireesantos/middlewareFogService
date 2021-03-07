const BROKER_URL = "mqtt://test.mosquitto.org";
const TOPIC_SUBSCRIB = "MiddlewareFog/edge";
const TOPIC_PUBLISH = "MiddlewareFog/edge";
const CLIENT_ID = "MiddleFog1000";
var PORT = 1883;

const defaultOption = {
  host: BROKER_URL,
  port: PORT,
  clientId: CLIENT_ID,
  clean: false,
  qos: 1,
  retain: true,
  keepalive: 60000,
  reconnectPeriod: 2000,
};

const subscribeOption = {
  qos: 1,
  rap: false,
  dup: true,
};

module.exports = {
  option: defaultOption,
  subs_Option: subscribeOption,
  BROKER_URL: BROKER_URL,
  TOPIC_SUBSCRIB: TOPIC_SUBSCRIB,
  TOPIC_PUBLISH: TOPIC_PUBLISH,
};
