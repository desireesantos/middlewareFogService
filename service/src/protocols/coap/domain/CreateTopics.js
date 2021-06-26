var coap = require("coap");

function create(config) {
  config.topics.map((pathname) => {
    var request = coap.request(buildOptions(pathname, config.options));
    request.write(JSON.stringify(`message to ${pathname}`));
    request.on("response", (resp) => {
      console.log("Got response:", resp.code, resp.payload.toString());
    });
    request.end();
  });
}

function buildOptions(pathname, options) {
  return Object.assign(options, { pathname });
}

module.exports = {
  createTopics: (config) => create(config),
};
