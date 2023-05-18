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

        // Vérifier si le nom de la variable est implicite
        if (isImplicitVariable(variableName)) {
          implicitVariablesCount++;
        }
      }
    }
  }

  console.log('Nombre de variables implicites :', implicitVariablesCount);
};

function isImplicitVariable(variableName) {
  // Vérifier si le nom de la variable est implicite (contient la même lettre plus de deux fois)
  const charCount = new Map();
  for (const char of variableName) {
    if (charCount.has(char)) {
      charCount.set(char, charCount.get(char) + 1);
    } else {
      charCount.set(char, 1);
    }
  }

  for (const count of charCount.values()) {
    if (count > 2) {
      return true;
    }
  }

  return false;
}