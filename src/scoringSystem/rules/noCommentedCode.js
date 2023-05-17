module.exports = function noCommentedCode(comment, parser){
    try{
        parser.parse(comment)
        return false
    } catch (err) { // the comment is not commented code
        return true;
    }
}