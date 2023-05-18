module.exports = function checkLineLength(lineString){
    let cpt = 0
    for(let char of lineString){
        if(char === ' ') cpt++
    }
    return lineString.length - cpt
}