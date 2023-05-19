const {Parser} = require('acorn')
const walk = require('acorn-walk')

module.exports = function generateSyntaxTreeJS(input){
    let comments = []
    let tree = Parser.parse(input, {ecmaVersion: "latest", onComment: (b, t)=> comments.push(t), locations: true})
    return {
        parser: Parser,
        comments: comments,
        tree: tree,
        string: input,
        walk: walk
    }
}
