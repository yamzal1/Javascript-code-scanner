module.exports = function checkLineLength(lineString){
    let indentLength = 0
    for(let char of lineString){
        if(char === ' ') indentLength++
        else break
    }
    return lineString.length - indentLength
}