const  checkFileSize  = require('../checkFileSize');

describe('checkFileSize', () => {
  test('should return line count from file content', () => {
    const fileContent = 
     `const a = 10;
      const b = 20;
      console.log(a + b);`;
  
    const lineCount = checkFileSize(fileContent);
  
    expect(lineCount).toBe(3);
  });
});

