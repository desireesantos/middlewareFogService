const NAME = 'middlefog.txt'
var fs = require('fs');

const writeFile = (content) => {
  if (!fs.existsSync('middlefog.csv')) {
    const header = "Edge, EdgeToFog, FogToCloud, CloudToFog, FogToEdge, BackToEdge";
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