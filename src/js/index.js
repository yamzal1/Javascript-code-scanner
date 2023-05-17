const acorn = require('acorn')
const {Parser} = require('acorn')
const generateSyntaxTree = require('src/index.js')
const calculateScore = require('src/scoringSystem/index.js')

let score = calculateScore(generateSyntaxTree(input, Parser))
