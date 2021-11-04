const NAME = 'middlefog.csv'
var fs = require('fs');

function writeContentFile(filename=NAME, content) {
    fs.appendFile(filename, content, err => {
        if (err) {
          console.error(err)
          return
        }
    })
}

module.exports = { writeContentFile }
