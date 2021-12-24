var coap = require("node-coap-client").CoapClient;

var { buildData } = require("../../../entities/dataToTransport");
var Translator = require("../../../entities/translator");
var translator = new Translator();
const DELIMITER = 'ts_sep_';
const TIME_TO_KEEP_COAP_EVENT_MS = 100000000;

const subscribeTopic = (config) => {
  const {host, port, pathname } = config.subscribe;
  const resource_path = `coap://${host}:${port}/${pathname}`;

  coap.observe(
        resource_path,  
        config.subscribe.method,
        (res) => {
          hasPayloadError(res) ? getValue(config) : translateData(Buffer.from(res.payload).toString(), config)
        },
        null,
        [{
          keepAlive: true,
          confirmable: true,
          retransmit: true
      }]
    )
    .then(() => { console.log("SUCESS")})
    .catch(err => { console.error("Subscribe Call Error - Observer", err)});

}

const hasPayloadError = (res) => {return res.code?.major == 5 && res.code?.minor == 0 }

async function getValue(config) {
  coap
     .request(
        config.subscribe.resource_path,  
        config.subscribe.method
     )
     .then(response => { 
          translateData(Buffer.from(response.payload).toString(), config)
     })
     .catch(err => { console.error("Subscribe Call Error - GET", err)})
     ;
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
   stringdate = JSON.stringify(new Date(dateTime));

   payloadFromEdgeToFog = {
    'message': Buffer.from(data).toString(),
    'date': stringdate.concat(` , ${new Date().toISOString()}`)
   }
  }

  const dataToSend = buildData(
    config.protocol,
    payloadFromEdgeToFog,
    config.direction
  );
  // 'middlewareToFog' 'middlewareOUTMSG'
  // if(config.subscribe.pathname == 'middlewareOUTMSG') 
  // console.log("====>> ", payloadFromEdgeToFog, 'CONFIG', config.subscribe)
  console.log("----------->>>>>>>", dataToSend);
  // translator.build(dataToSend);
}

module.exports = {
  subscriber: (config) => subscribeTopic(config),
};
