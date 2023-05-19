module.exports = function checkIndent(input,tokens){
    errCount = 0
    indentErrorLines = new Set()
    indentLevel = 0
    lines = input.split('\n')
    currentLine = 1
    for(let token of tokens){
        tokenLine = token.loc.start.line
        if(token.type.label === "{") {
            indentLevel+=4
            currentLine = tokenLine
        }
        if(token.type.label === '}'){
            indentLevel-=4
        }
        if(tokenLine===currentLine) continue
        let whiteSpaces = lines[tokenLine-1].match(/^\s*/)
        let leadingSpaces
        if(!whiteSpaces) leadingSpaces = 0
        else leadingSpaces = whiteSpaces[0].length
        
        if(leadingSpaces !== indentLevel){
            indentErrorLines.add(tokenLine)
            errCount++
        }
    }
    return indentErrorLines
}