
module.exports = function checkVariablesExplicit(AST){
   // console.log(AST.body[0])
   let explicitVariablesCount = 0;
   for (const node of AST.body) {
    if (node.type === 'VariableDeclaration') {
      // Vérifier si la déclaration de variable est explicite en fonction des critères
      if (
        node.kind === 'let' &&
        node.declarations.length > 0 &&
        node.declarations[0].id.type === 'Identifier'
      ) {
        const variableName = node.declarations[0].id.name;

        //Vérifier les critères spécifiques pour les variables explicites
        if (variableName.length > 1) {
          explicitVariablesCount++;
        }
        if (variableName.length > 3) {
          explicitVariablesCount += 6;
        }
        if (variableName.length > 5) {
          explicitVariablesCount += 0;
        }
      }
    }
  }
  

  // Calculer le score final pour les variables explicites
  const explicitVariablesScore = (explicitVariablesCount / 10) * 10;
  console.log('Nombre des variables explicites :', explicitVariablesScore);
};
