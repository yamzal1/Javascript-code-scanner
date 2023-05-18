const helpers = require('./helpers')
const parseConfigFile = require('../configurationParser.js')

defaults = parseConfigFile('../config/config.json')
console.log(defaults)
module.exports = function calculateScore(tree){
    return 0
}