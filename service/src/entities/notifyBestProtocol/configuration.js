const FOG_SERVER_HOSTNAME = "192.168.1.4";
const FOG_RESOURCE_SUB_PATHNAME = "bestProtocol";

exports.bestProtocolConfiguration = {
  observe: true,
  host: FOG_SERVER_HOSTNAME,
  pathname: FOG_RESOURCE_SUB_PATHNAME,
  method: "get",
  confirmable: "true"
};