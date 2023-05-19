const acorn = require("acorn");
const walk = require("acorn-walk");
const checkNamingConventions = require("../checkNamingConventions");

test('should detect incorrect naming conventions', () => {
    const code = `
        let myVariable = 1;
        let my_variable = 2;
        let MyVariable = 3;
    `;
    const AST = acorn.Parser.parse(code, {ecmaVersion:2020});

    expect(checkNamingConventions(AST, ['camelCase'])).toBe(2);
});

test('should not report correct naming conventions', () => {
    const code = `
        let myVariable = 1;
        let anotherVariable = 2;
        let thirdVariable = 3;
    `;
    const AST = acorn.Parser.parse(code, {ecmaVersion:2020});

    expect(checkNamingConventions(AST, ['camelCase'])).toBe(0);
});

test('should handle multiple naming conventions', () => {
    const code = `
        let myVariable = 1;
        let another_variable = 2;
        let ThirdVariable = 3;
    `;
    const AST = acorn.Parser.parse(code, {ecmaVersion:2020});

    expect(checkNamingConventions(AST, ['camelCase', 'snake_case', 'PascalCase'])).toBe(0);
});

test('should handle no naming conventions', () => {
    const code = `
        let myVariable = 1;
        let another_variable = 2;
        let ThirdVariable = 3;
    `;
    const AST = acorn.Parser.parse(code, {ecmaVersion:2020});

    expect(checkNamingConventions(AST, [])).toBe(3);
});