const FOG_SERVER_HOSTNAME = "54.94.174.102";
const FOG_RESOURCE_SUB_PATHNAME = "middlewareToFog";
const FOG_RESOURCE_PUB_PATHNAME = "middlewareToCloud";
var build_COAP_Topics = ["middlewareToCloud", "middlewareToFog"];

var subscribe_connection = {
  observe: true,
  host: FOG_SERVER_HOSTNAME,
  pathname: FOG_RESOURCE_SUB_PATHNAME,
  method: "get",
  confirmable: "true",
  options: {
    Accept: 'application/json'
  }
};

function setupCloudPublish() {
  const newLocal = {
    host: FOG_SERVER_HOSTNAME,
    pathname: FOG_RESOURCE_PUB_PATHNAME,
    method: "put",
    confirmable: "true",
    options: {
      Accept: 'application/json'
    }
  };
  return newLocal
}


module.exports = {
  subscribe_connection: subscribe_connection,
  topics: build_COAP_Topics,
  setupCloudPublish,
};
