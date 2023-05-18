const { parse } = require('acorn');
const noUnusedVariable = require('../noUnusedVariable');
const walk = require("acorn-walk")

describe('noUnusedVariable', () => {
  it('should detect unused identifiers', () => {
    const code = `
      import fs from 'fs';
      let a = 10;
      let b = 20;
      function testFunc() {
        return 'testFunc';
      }
      console.log(b);
    `;
    const AST = parse(code, { sourceType: 'module', ecmaVersion: 2020 });
    const unusedIdentifiers = noUnusedVariable(AST, walk);
    expect(unusedIdentifiers).toEqual(expect.arrayContaining(['fs', 'a', 'testFunc']));
  });

  it('should return an empty array when there are no unused identifiers', () => {
    const code = `
      import fs from 'fs';
      let a = 10;
      console.log(fs, a);
    `;
    const AST = parse(code, { sourceType: 'module', ecmaVersion: 2020 });
    const unusedIdentifiers = noUnusedVariable(AST, walk);
    expect(unusedIdentifiers).toEqual([]);
  });
});