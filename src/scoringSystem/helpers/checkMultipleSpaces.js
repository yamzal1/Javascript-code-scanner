module.exports = function checkMultipleSpaces(line){
    indentLength = 0
    while(line[indentLength] === ' ') indentLength++

    let max = 0
    let cpt = 0
    for(let i = indentLength; i<line.length; i++){
        if(/=/.test(line[i])) max = 0 // if there are many spaces before an =, they are ignored
        if(line[i] === ' '){
            cpt++
            if(cpt > 1 && cpt > max) max = cpt
        }
        else cpt = 0
    }
    return max
}