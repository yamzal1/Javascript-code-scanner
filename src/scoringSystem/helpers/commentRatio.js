module.exports = function commentRatio(input, comments){
    let nbCommentLines = 0
    for(let comment of comments){
        nbCommentLines += comment.split('\n').length
    }
    return nbCommentLines/input.split('\n').length * 100
}