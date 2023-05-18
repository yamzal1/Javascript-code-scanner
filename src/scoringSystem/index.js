const helpers = require('./helpers')
const parseConfigFile = require('../configurationParser.js')

defaults = parseConfigFile('../config/config.json')
module.exports = function calculateScore(input){ //input is an object: {tree, string, comments, parser}
    console.log("[checkFileSize]", helpers.checkFileSize(input.string))
    //console.log("[checkIndent]", helpers.checkIndent(input.tree)) WIP
    console.log("[checkNamingConventions]", helpers.checkNamingConventions(input.tree))
    console.log("[checkNbEmptyLines]", helpers.checkNbEmptyLines(input.string))
    console.log("[commentRatio]", helpers.commentRatio(input.string, input.comments))
    //console.log("[noUnusedVariables]", helpers.noUnusedVariables(input.tree)) WIP
    for(let comment of input.comments){
        console.log("[noCommentedCode]", helpers.noCommentedCode(comment, input.parser))
    }
    for(let line of input.string.split('\n')){
        let lineLength = helpers.checkLineLength(line)
        if(lineLength>100) console.log("[checkLineLength]", lineLength)
        let multipleSpaces = helpers.checkMultipleSpaces(line)
        if(multipleSpaces>0) console.log("[checkMultipleSpaces]", multipleSpaces)
    }

    return 0
}