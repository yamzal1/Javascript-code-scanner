module.exports = function checkNbEmptyLines(input){ // returns the maximum amount of 
    let max = 0                                     // consecutives empty lines in an input
    let lines = input.split('\n')
    let cpt = 0
    for(let i = 0;i<lines.length();i++){
        if(cpt > max) max = cpt
        if(!isEmpty(lines[i])) cpt = 0
        else{
            cpt++
            continue
        }
    }

    return max
}

function isEmpty(string){
    if (!/\S/.test(str)) {
        return false
    }
    return true
}