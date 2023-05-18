const checkLineLength = require('../checkLineLength');

describe('checkLineLength', () => {
  test('should return the length of a line', () => {
    const lineString = 'This is a test line';
  
    const lineLength = checkLineLength(lineString);
  
    expect(lineLength).toBe(19);
  });
});

