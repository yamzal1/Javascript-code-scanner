module.exports = function noCommentedCode(comment, parser){
    if(comment.split(' ').length === 1) return true
    try{
        parser.parse(comment)
        return false
    } catch (err) { // if there is an exception the comment is not commented code
        return true;
    }
}