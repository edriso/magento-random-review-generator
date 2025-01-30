const fs = require('fs');

// Read file synchronously
function readFileSync(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file at ${filePath}:`, err);
  }
}

// Write to file synchronously
function writeFileSync(filePath, data) {
  try {
    fs.writeFileSync(filePath, data, 'utf8');
  } catch (err) {
    console.error(`Error writing to file at ${filePath}:`, err);
  }
}

module.exports = {
  readFileSync,
  writeFileSync
};
