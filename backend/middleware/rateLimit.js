const rateLimit = require('express-rate-limit');

// Limiteur pour la route login/signup, on mets volontairement un contrôle restictif ici pour empêcher les tentatives de connexion/inscription froduleuse
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 5,                     
  message: 'Trop de tentatives. Réessayez dans 15 minutes.'
});

// Limiteur pour les autres routes sensible  POST/api/books, on reste plus permissif pour ne pas impacter l'expérience utilisateur
exports.apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,    
  max: 50,                    
  message: 'Vous avez atteint la limite de requêtes. Réessayez dans 5 minutes.'
});
