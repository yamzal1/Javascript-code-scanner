const fs = require('fs');

function checkFileSize(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n');
  const lineCount = lines.length;

  if (lineCount > 200) {
    return lineCount - 200; // Retourne le nombre de lignes au-dessus de 200
  }

  return 0; // Retourne 0 si le nombre de lignes est inférieur ou égal à 200
}

// Exemple d'utilisation
const filePath = 'src/input/test.js';
const lineCount = checkFileSize(filePath);
console.log('Nombre de lignes au-dessus de 200 :', lineCount);