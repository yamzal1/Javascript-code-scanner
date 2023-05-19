const fs = require('fs')
const path = process.argv[2]
const treeGenerator = require('./js/index.js')
const scoringSystem = require('./scoringSystem/index.js')

/* detect programming language */
/* read input code and redirect it to right library */  
const input = fs.readFileSync(path).toString()

let score = scoringSystem(treeGenerator(input))

console.log("SCORE",score)

