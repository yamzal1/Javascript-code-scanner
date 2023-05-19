const  checkNbEmptyLines  = require('../checkNbEmptyLines');

describe('checkNbEmptyLines', () => {
  test('should return line max number line empty', () => {
    const fileContent = 
     `const a = 10;



      const b = 20;
      console.log(a + b);`;
  
    const MaxNbLinesEmpty = checkNbEmptyLines(fileContent);
  
    expect(MaxNbLinesEmpty).toBe(3);
  });
});

