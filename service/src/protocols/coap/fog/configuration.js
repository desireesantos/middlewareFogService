 var Agent = require('coap').Agent; 
const FOG_SERVER_HOSTNAME = "192.168.1.36";
const PORT = "5683";
const FOG_RESOURCE_SUB_PATHNAME = "middlewareOUTMSG";
const FOG_RESOURCE_PUB_PATHNAME = "middlewareIN";
const build_COAP_Topics = [FOG_RESOURCE_SUB_PATHNAME, FOG_RESOURCE_PUB_PATHNAME];

var defaultSubCoapConnection = {
  observe: true,
  host: FOG_SERVER_HOSTNAME,
  port: PORT,
  pathname: FOG_RESOURCE_SUB_PATHNAME,
  method: "get",
  confirmable: "true",
  agent : new Agent({ type: 'udp4' }),
  options: {
    Accept: 'application/json'
  }
};

var defaultPubCoapConnection = {
  host: FOG_SERVER_HOSTNAME,
  pathname: FOG_RESOURCE_PUB_PATHNAME,
  method: "put",
  confirmable: "true",
  options: {
    Accept: 'application/json'
  }
};

module.exports = {
  subscribe_connection: defaultSubCoapConnection,
  publish_connection: defaultPubCoapConnection,
  topics: build_COAP_Topics,
};
