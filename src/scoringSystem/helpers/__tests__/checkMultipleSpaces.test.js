const checkMultipleSpaces = require('../checkMultipleSpaces');

describe('checkMultipleSpaces', () => {
  test('should return the maximum number of consecutive spaces in a line', () => {
    const line = 'const a =    10;';
  
    const maxSpaces = checkMultipleSpaces(line);
  
    expect(maxSpaces).toBe(4);
  });
});
