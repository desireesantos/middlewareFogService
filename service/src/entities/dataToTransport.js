function buildData(protocol, message, isDataToCloud = false) {
  return {
    protocol,
    message,
    isDataToCloud,
  };
}

module.exports = {
  buildData: (protocol, msg, direction) => buildData(protocol, msg, direction),
};
