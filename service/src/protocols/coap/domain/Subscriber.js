var coap = require("node-coap-client").CoapClient;

var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();
const DELIMITER = 'ts_sep_';

const subscribeTopic = (config) => {
  coap.observe(
        generate_resource_url(config),  
        config.subscribe.method,
        (res) => {
          hasPayloadError(res) ? getValue(config) : translateData(res.payload, config)
        },
        Buffer.from([]),
        [{
          keepAlive: true,
          confirmable: true,
          retransmit: true
      }]
    )
    .then(() => { console.log("SUCESS")})
    .catch(err => { console.error("Subscribe Call Error - Observer", err)});

}

const hasPayloadError = (res) => {return res.code?.major >= 4 && res.code?.minor == 0 }

async function getValue(config) {
  coap
     .request(
      generate_resource_url(config),  
      config.subscribe.method
     )
     .then(response => {
          translateData(Buffer.from(response.payload).toString(), config)
     })
     .catch(err => { console.error("Subscribe Call Error - GET", err)})
     ;
}
const generate_resource_url = (config) => {
  const {host, port, pathname} = config.subscribe;
  return `coap://${host}:${port}/${pathname}`;
}

const translateData = (data, config) => {
var payloadFromEdgeToFog = '';

try {
  json = JSON.parse(data)
  payloadFromEdgeToFog = {
    'message': json.message ? Buffer.from(json.message).toString() : Buffer.from(data).toString(),
    'date': json.date ? json.date.concat(`, ${new Date().toISOString()}`) : ` ${new Date().toISOString()}`
  }
} catch (error) {
  separedMessageDate = Buffer.from(data).toString().split(DELIMITER)
  dateTime = parseInt(separedMessageDate[0])
  stringDate = new Date(dateTime).toISOString();

  payloadFromEdgeToFog = {
  'message': Buffer.from(data).toString(),
  'date': stringDate.concat(` , ${new Date().toISOString()}`)
  }
}

const dataToSend = buildData(
  config.protocol,
  payloadFromEdgeToFog,
  config.direction
);
// 'middlewareToFog' 'middlewareOUTMSG'
// if(config.subscribe.pathname == 'middlewareOUTMSG') 
// console.log("====>> ", payloadFromEdgeToFog)
// console.log("=====", dataToSend);
translator.build(dataToSend);
}

module.exports = {
subscriber: (config) => subscribeTopic(config),
};
