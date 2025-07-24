// Package permettant de gérer les fichiers entrants
const multer = require('multer');

// Déclaration d'un dictionnaire avec les extensiosn acceptées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/* Variable storage qui va contenir la méthode dickStorage pour indiquer à multer comment gérer les fichiers entrants notamment le dosier de déstination des fichiers
 mais également leurs noms via une mise en forme qui garde nom_du_fichier+date+extension*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Enfin on exporte le middleware pour une future utilisation en lui précisant qu'on ne géreras qu'un seul fichier 'image' entrant à la fois
module.exports = multer({storage: storage}).single('image');

/* La méthode diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants.
La méthode single() crée un middleware qui capture les fichiers d'un certain type (passé en argument), 
et les enregistre au système de fichiers du serveur à l'aide du storage configuré. */