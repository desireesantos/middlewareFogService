const FOG_SERVER_HOSTNAME = "localhost";
const FOG_RESOURCE_SUB_PATHNAME = "middlewareIN";
const FOG_RESOURCE_PUB_PATHNAME = "middlewareOUT";

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
};
