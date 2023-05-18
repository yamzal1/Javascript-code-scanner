module.exports = function noUnusedVariables(syntaxtTree){
    let vars = {}
    for(let node of syntaxtTree.body){
        if(node.type === 'VariableDeclaration'){
            for(let declaration of node.declarations){
                let variable = declaration.id.name
                vars[variable] = false
            }
        }

        if(node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression'){
            
        }
    }
}