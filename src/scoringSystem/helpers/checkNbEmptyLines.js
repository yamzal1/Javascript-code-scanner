module.exports = function checkNbEmptyLines(input){ // returns the maximum amount of 
    let max = 0                                     // consecutives empty lines in an input
    let lines = input.split('\n')
    let cpt = 0
    for(let i = 0;i<lines.length;i++){
        if(!isEmpty(lines[i])) cpt = 0
        else{
            cpt++
            if(cpt > max) max = cpt
            continue
        }
    }

    return max
}

function isEmpty(str){
    if (!/\S/.test(str)) {
        return true
    }
    return false
}