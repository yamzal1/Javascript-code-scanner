const checkVariablesExplicit = require('../checkVariablesExplicit');

describe('checkVariablesExplicit', () => {
  test('should return the number of implicit variables', () => {
    const AST = {
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              id: { type: 'Identifier', name: 'aaaaa' },
              init: null,
              loc: null,
              type: 'VariableDeclarator',
            },
          ],
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              id: { type: 'Identifier', name: 'bb' },
              init: null,
              loc: null,
              type: 'VariableDeclarator',
            },
          ],
        },
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              id: { type: 'Identifier', name: 'lala' },
              init: null,
              loc: null,
              type: 'VariableDeclarator',
            },
          ],
        },
      ],
    };

    const implicitVariablesCount = checkVariablesExplicit(AST);

    expect(implicitVariablesCount).toBe(2);
  });
});