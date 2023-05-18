const {Parser} = require('acorn')
//const calculateScore = require('src/scoringSystem/index.js')

//let score = calculateScore(generateSyntaxTree(input, Parser))


module.exports = function generateSyntaxTreeJS(input){
    let comments = []
    let tree = Parser.parse(input, {ecmaVersion: "latest", onComment: (b, t)=> comments.push(t)})
    return {
        parser: Parser,
        comments: comments,
        tree: tree,
        string: input
    }
}
