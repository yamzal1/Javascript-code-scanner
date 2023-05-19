function isImplicitVariable(variableName) {
  // Vérifier si le nom de la variable est implicite (un seul mot et contient des lettres consécutives répétées)
  const regex = /^(\w)\1+$/;
  return regex.test(variableName);
}

module.exports = function checkVariablesExplicit(AST) {
  let implicitVariablesCount = 0;

  for (const node of AST.body) {
    if (node.type === 'VariableDeclaration') {
      // Vérifier si la déclaration de variable est implicite en fonction des critères
      if (
        node.kind === 'let' &&
        node.declarations.length > 0 &&
        node.declarations[0].id.type === 'Identifier'
      ) {
        const variableName = node.declarations[0].id.name;

        // Vérifier si le nom de la variable est implicite (un seul mot et contient des lettres consécutives répétées)
        if (isImplicitVariable(variableName)) {
          implicitVariablesCount++;
        }
      }
    }
  }
  return implicitVariablesCount; 

  //console.log('Nombre de variables implicites :', implicitVariablesCount);
};