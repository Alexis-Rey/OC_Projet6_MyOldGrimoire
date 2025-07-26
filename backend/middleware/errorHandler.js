const multer = require('multer');

function errorHandler(err, req, res, next) {
  // 1. Si c'est une erreur Multer (limite de taille, fileFilter…)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

   if (err.message && err.message.startsWith('Seules les images')) {
    return res.status(400).json({ message: err.message });
  }

  // 2. Pour toutes les autres erreurs, log et 500
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
}

module.exports = errorHandler;