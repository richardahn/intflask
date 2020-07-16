const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

/** Saves image to directory and generates a unique UUID for it that gets returned by the function */
async function saveImage(file, saveDirectory = 'content/images') {
  const extension = file.originalname.split('.').pop();
  const newName = uuidv4() + '.' + extension;
  await fs.writeFile(path.join(saveDirectory, newName), file.buffer);
  return newName;
}

module.exports = saveImage;
