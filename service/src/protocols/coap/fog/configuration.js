const FOG_SERVER_HOSTNAME = "127.0.0.1";
const FOG_RESOURCE_SUB_PATHNAME = "middlewareOUTMSG";
const FOG_RESOURCE_PUB_PATHNAME = "middlewareIN";
var build_COAP_Topics = ["middlewareOUTMSG", "middlewareIN"];

var defaultSubCoapConnection = {
  observe: true,
  host: FOG_SERVER_HOSTNAME,
  pathname: FOG_RESOURCE_SUB_PATHNAME,
  method: "get",
  confirmable: "true",
};

var defaultPubCoapConnection = {
  host: FOG_SERVER_HOSTNAME,
  pathname: FOG_RESOURCE_PUB_PATHNAME,
  method: "put",
  confirmable: "true",
};

module.exports = {
  subscribe_connection: defaultSubCoapConnection,
  publish_connection: defaultPubCoapConnection,
  topics: build_COAP_Topics,
};
