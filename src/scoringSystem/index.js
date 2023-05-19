const helpers = require('./helpers')
const parseConfigFile = require('../configurationParser.js')

defaults = parseConfigFile('../config/config.json')
module.exports = function calculateScore(input) { //input is an object: {tree, string, comments, parser, walk}
    let finalScore = 0

    let fileSize = helpers.checkFileSize(input.string)
    let fileSizeScore = 1
    if (fileSize > defaults["max-file-length"].value) {
        console.log('[File too long]', fileSize)
        errorCount = fileSize - defaults["max-file-length"].value
        for (let c of defaults["max-file-length"].criteria) {
            if (errorCount < c["error-count"]) break
            fileSizeScore = c.score
        }
    }
    finalScore += fileSizeScore * defaults["max-file-length"].weight

    let indentErrorCount = helpers.checkIndent(input.tree, input.walk) //WIP
    let indentScore = 1
    if (indentErrorCount > defaults.indentation.value) {
        console.log('[Indentation errors]', indentErrorCount)
        for (let c of defaults.indentation.criteria) {
            if (indentErrorCount < c["error-count"]) break
            indentScore = c.score
        }
    }
    finalScore += indentScore * defaults.indentation.weight

    let implicitVariableNameCount = helpers.checkVariablesExplicit(input.tree)
    let explicitVariablesScore = 1
    if (implicitVariableNameCount > defaults["explicit-variable-names"].value) {
        console.log("[Implicit names] You have",implicitVariableNameCount,"inexplicit variables")
        for (let c of defaults["explicit-variable-names"].criteria) {
            if (implicitVariableNameCount < c["error-count"]) break
            explicitVariablesScore = c.score
        }
    }

    finalScore += explicitVariablesScore * defaults["explicit-variable-names"].weight

    let commentedCodeCount = 0
    let noCommentedCodeScore = 1
    for(let comment of input.comments){
        if(!helpers.noCommentedCode(comment, input.parser)) commentedCodeCount++
    }

    if(commentedCodeCount>defaults["no-commented-code"].value){
        console.log("[No commented code]", commentedCodeCount)
        for(let c of defaults["no-commented-code"].criteria){
            if (commentedCodeCount < c["error-count"]) break
            noCommentedCodeScore = c.score
        }
    }

    finalScore += noCommentedCodeScore * defaults["no-commented-code"].weight

    let notCamelCaseVarCount = helpers.checkNamingConventions(input.tree)
    let camelScore = 1
    if (notCamelCaseVarCount > defaults["camel-case-variables"].value) {
        console.log("[Not camelCase variables]", notCamelCaseVarCount)
        for (let c of defaults["camel-case-variables"].criteria) {
            if (notCamelCaseVarCount < c["error-count"]) break
            camelScore = c.score
        }
    }

    finalScore += camelScore * defaults["camel-case-variables"].weight

    let codeCommentRatio = helpers.commentRatio(input.string, input.comments)
    let commentRatioScore = 1
    if(codeCommentRatio > defaults["code-comment-ratio"]["comment-ratio-max"]){
        console.log("[Comment ratio too high]",codeCommentRatio,"%")
        commentRatioScore = 0
    }

    finalScore += commentRatioScore * defaults["code-comment-ratio"].weight

    let unusedIdentifiers = helpers.noUnusedVariables(input.tree, input.walk)
    let unusedNb = unusedIdentifiers.length
    let unusedScore = 1
    if(unusedNb) console.log("You have",unusedNb,"unused identifiers:", unusedIdentifiers)
    if(unusedNb > defaults["unused-imports-variables"].value){
        console.log("[No unused variables]",unusedNb)
        for (let c of defaults["unused-imports-variables"].criteria) {
            if (unusedNb < c["error-count"]) break
            unusedScore = c.score
        }
    }

    finalScore += unusedScore * defaults["unused-imports-variables"].weight

    let consecutiveEmptyLinesCount = helpers.checkNbEmptyLines(input.string)
    let emptyLinesScore = 1
    if(consecutiveEmptyLinesCount > defaults["consecutive-empty-lines"].value){
        console.log("[No multiple empty lines]",consecutiveEmptyLinesCount)
        for(let c of defaults["consecutive-empty-lines"].criteria){
            if (consecutiveEmptyLinesCount < c["error-count"]) break
            emptyLinesScore = c.score
        }
    }
    finalScore += emptyLinesScore * defaults["consecutive-empty-lines"].weight

    maxLineLengthCount = 0
    multipleSpacesCount = 0

    for(let line of input.string.split('\n')){
        let lineLength = helpers.checkLineLength(line)
        let multipleSpaces = helpers.checkMultipleSpaces(line)
        if(lineLength>defaults["max-line-length"].value){
            maxLineLengthCount++
        }
        if(multipleSpaces>defaults["double-spaces"].value){
            multipleSpacesCount++
        }
    }
    if(maxLineLengthCount) console.log("[No long lines]",maxLineLengthCount)
    if(multipleSpacesCount) console.log("[No multiples spaces]",multipleSpacesCount)

    maxLineLengthScore = 1
    doubleSpacesScore = 1
    for(let c of defaults["max-line-length"].criteria){
        if (maxLineLengthCount < c["error-count"]) break
        maxLineLengthScore = c.score
    }

    finalScore += maxLineLengthScore * defaults["max-line-length"].weight

    for(let c of defaults["double-spaces"].criteria){
        if (multipleSpacesCount < c["error-count"]) break
        doubleSpacesScore = c.score
    }

    finalScore += doubleSpacesScore * defaults["double-spaces"].weight

    return Math.floor(finalScore * 100) 
}