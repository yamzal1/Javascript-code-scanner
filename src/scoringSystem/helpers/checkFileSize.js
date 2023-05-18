function checkFileSize(fileContent) {
  const lines = fileContent.split('\n');
  const lineCount = lines.length;

  return lineCount;
}
/* Exemple d'utilisation
const filePath = 'input/test.js';
const lineCount = checkFileSize(filePath);
console.log('Nombre de lignes au-dessus de 200 :', lineCount);
*/

module.exports = checkFileSize