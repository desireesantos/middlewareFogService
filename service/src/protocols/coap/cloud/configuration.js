const FOG_SERVER_HOSTNAME = "127.0.0.1"; //"54.207.100.54";
const FOG_RESOURCE_SUB_PATHNAME = "middlewareToFog";
const FOG_RESOURCE_PUB_PATHNAME = "middlewareToCloud";
var build_COAP_Topics = ["middlewareToCloud", "middlewareToFog"];

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
