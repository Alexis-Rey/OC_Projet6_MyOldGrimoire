// Bibilothèque permettant de gérer les fichiers entrants
const multer = require('multer');

// Seuls ces mimetypes sont autorisés
const MIME_TYPES = {
  'image/jpg':  'jpg',
  'image/jpeg': 'jpg',
  'image/png':  'png',
  'image/webp': 'webp'
};

// Filtre pour n’accepter que les extensions du dictionnaire sinon génération d'erreur 
const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images JPG, PNG et Webp sont autorisées'), false);
  }
};

// Stockage en mémoire pour traitement ultérieur avec Sharp dans imagesOptimizer.js
const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }  // 2 Mo max
}).single('image');