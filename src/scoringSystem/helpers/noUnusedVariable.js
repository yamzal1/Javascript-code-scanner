module.exports = function noUnusedVariables(AST, walk) {
    /**
     * Function that check if there are unused : - variables
     *                                           - imports
     *                                           - functions
     *                                           - classes
     * 
     * Doesn't check arrow functions
     * Doesn't check scope (if we declare a variable inside of a function and don't use it,
     * it will still be considered as used if another variable with the same name is used elsewhere)
     *
     */
  let declaredIdentifiers = new Set();
  let usedIdentifiers = new Set();

  walk.ancestor(AST, {
    VariableDeclarator(node, ancestors) {
      if (node.id.type === 'Identifier') {
        declaredIdentifiers.add(node.id.name);
      }
    },
    FunctionDeclaration(node, ancestors) {
      if (node.id && node.id.type === 'Identifier') {
        declaredIdentifiers.add(node.id.name);
      }
    },
    ClassDeclaration(node, ancestors) {
      if (node.id && node.id.type === 'Identifier') {
        declaredIdentifiers.add(node.id.name);
      }
    },
    ImportDeclaration(node, ancestors) {
      node.specifiers.forEach(specifier => {
        if (specifier.type === 'ImportSpecifier' || specifier.type === 'ImportDefaultSpecifier') {
          declaredIdentifiers.add(specifier.local.name);
        }
      });
    },
    Identifier(node, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      if (!['VariableDeclarator', 'FunctionDeclaration', 'ClassDeclaration', 'ImportSpecifier', 'ImportDefaultSpecifier'].includes(parent.type)) {
        usedIdentifiers.add(node.name);
      }
    },
  });

  let unusedIdentifiers = [...declaredIdentifiers].filter(identifier => !usedIdentifiers.has(identifier));

    return(unusedIdentifiers);
};
