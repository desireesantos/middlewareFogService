const NAME = 'middlefog.txt'
var fs = require('fs');

function writeFile(content) {
  if (!fs.existsSync('middlefog.csv')) {
    const header = ["Protocol, Edge, EdgeToFog, FogToCloud, CloudToFog, FogToEdge"];
    fs.appendFile('middlefog.csv', extractAsCSV(header), 'utf8', function (err) {
      if (err) console.log('Saved!');
    });
  }
   fs.appendFile('middlefog.csv', extractAsCSV(content), 'utf8', function (err) {
    if (err) console.log('Saved!');
  });
}

function extractAsCSV(content) {
  return content.concat("\n");
}

module.exports = {
  writeFile
}