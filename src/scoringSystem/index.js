const noCommentedCode = require('./rules/noCommentedCode.js')
const parseConfigFile = require('../configurationParser.js')

defaults = parseConfigFile('../config/config.json')
console.log(defaults)
module.exports = function calculateScore(tree){
    return 5
}