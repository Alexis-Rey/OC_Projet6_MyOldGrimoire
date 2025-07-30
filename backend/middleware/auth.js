const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
        // On vérifie d'abord la présence de l’en‑tête dans la requête
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant' });
    }
    // Ensuite on extrait le token sans la partie "Bearer"
    const token = authHeader.split(' ')[1];
    /*  On vérifie sa validité grâce à .verify et on décode le payload
    Un token est composé d'un header, d'un payload et d'une signature : 
    Header : indique l’algorithme utilisé pour la signature 
    Payload : ilcontient les claims qui sont des données concernant le token comme par exemple le userId, la date d'expiration du token, le rôle attribué avec le token,etc..
    Signature : garantit l’intégrité du token (que personne n’a modifié l’en‑tête ni le payload) 
    Ainsi en décodant le payload on pourra récupérer l'ID utilisateur*/
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };
    next();
  } catch (error) {
    // Gestion d'une erreur ( token expiré par exemple)
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};