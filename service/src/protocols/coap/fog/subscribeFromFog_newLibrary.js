var coap = require("node-coap-client").CoapClient;

const { subscribe_connection } = require("./configuration");
const Protocol = require("../../../constant/enumsProtocols");
const Direction = require("../../../constant/enumsFogCloud");
var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();
var resource_path = `coap://${subscribe_connection.host}:${subscribe_connection.port}/${subscribe_connection.pathname}`;


const subscribeTopic = () => {
    coap
    .observe(
        resource = resource_path,  
        method = subscribe_connection.method,
        (res) => {
            hasPayloadError(res) ? getValue() : translateData(Buffer.from(res.payload).toString())

        .then(response => { result = Buffer.from(response.payload).toString() })
        .catch(err => { console.error("Subscribe Call Error - GET", err) });
        }
    )
    .then(() => { console.log("SUCESS")})
    .catch(err => { console.error("Subscribe Call Error - Observer", err)});
}

async function getValue() {
    coap
       .request(
           resource = resource_path,  
           method = subscribe_connection.method,
       )
       .then(response => { 
            translateData(Buffer.from(response.payload).toString())
       })
       .catch(err => { console.error("Subscribe Call Error - GET", err)})
       ;
}

const hasPayloadError = (res) => {return res.code.major == 5 && res.code.minor == 0 }


function translateData(data) {
  payload = {
    'message': Buffer.from(data).toString(),
    'date': new Date().toISOString()
  }
  const dataToSend = buildData(
    Protocol.COAP,
    payload,
    Direction.TO_CLOUD
  );
  console.log("dataToSend --->", dataToSend)
//   translator.build(dataToSend);
}

module.exports = {
  subscribe: () => subscribeTopic(),
};
