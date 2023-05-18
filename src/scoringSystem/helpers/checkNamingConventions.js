module.exports = function checkNamingConventions(AST, conventions = ['camelCase','CONSTANT_CASE']){
    /***
     * Returns the number of variable declarations in the syntaxic tree that do not conform to the chosen naming conventions
     * 
     */

    let VariableDeclarations =  AST.body.filter( function (node) {
        return node.type == 'VariableDeclaration'
    });

    let names = VariableDeclarations.map(v => v.declarations[0].id.name);

    let nonConformingCount = 0;
 
    let namingConventions = {
       // 'camelCase': /^[a-z]+([A-Z][a-z]*)*$/ //V1
        'camelCase': /^[a-z][A-Za-z]*$/,         //V2
        'PascalCase':/^[A-Z][a-zA-Z]*$/,
        'snake_case' : /^[a-z]+(_[a-z]+)*$/,
        'kebab-case' : /^[a-z]+(-[a-z]+)*$/,
        'CONSTANT_CASE' : /^[A-Z]+(_[A-Z]+)*$/,
    };

    names.forEach(name => {
        let conformsToAnyConvention = conventions.some(convention => {
            let regex = namingConventions[convention];
            return regex.test(name);
        });

        if (!conformsToAnyConvention) {
            nonConformingCount++;
        }
    });

    return nonConformingCount;
}