var coap = require("node-coap-client").CoapClient;
var { publish_connection } = require("./configuration");
var { writeFile } = require("./../../../entities/file/writeContent")
const Protocols = require('../../../constant/enumsProtocols')

function publishTopic(payload) {

  const payloadFromFogTo = {
    'message': payload.message,
    'date': payload.date.concat(`, ${new Date().toISOString()}`)
  }
  coap
     .request(
      generate_resource_url(),  
      publish_connection.method,
      payloadFromFogTo
     )
     .then(response => {"Published to Cloud", response})
     .catch(err => { console.error("Subscribe Call Error - GET", err)})
     ;

  // writeFile(payloadFromFogTo.date);
}
const generate_resource_url = () => {
  const {host, port, pathname} = publish_connection;
  return `coap://${host}:${port}/${pathname}`;
}

module.exports = {
  publish: (data) => publishTopic(data),
};
