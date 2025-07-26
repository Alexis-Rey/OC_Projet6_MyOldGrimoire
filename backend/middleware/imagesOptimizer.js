const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const imagesDir = path.join(__dirname, '../images');
console.log(imagesDir);

module.exports = async (req, res, next) => {
  // Si pas de fichier uploadé, on continue
  if (!req.file) return next();

  try {
    // Construction du nom unique
    const basename = path.parse(req.file.originalname).name;
    const cleaned = basename.split(' ').join('_');
    const timestamp = Date.now();
    const ext = 'webp';
    // le nouveau nom comprends le nom original de l'image sans espace + la date + l'extension 
    const filename = `${cleaned}-${timestamp}.${ext}`.toLowerCase();
    const outPath = path.join(imagesDir, filename);

    // 2. Traitement Sharp
    await sharp(req.file.buffer)
      .resize({ width: 500, height: 500, fit: 'inside' }) 
      .webp({ quality: 70 })
      .toFile(outPath);

    // 3. Injection dans req.file pour le contrôleur
    req.file.filename = filename;

    next();
  } catch (err) {
    next(err);
  }
};