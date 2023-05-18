const fs = require('fs')
module.exports = function parseConfigFile(configFile) {
    contentFile = fs.readFileSync(configFile);
    parsedJson = JSON.parse(contentFile)
    return parsedJson
}