const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const booksRoutes= require('./routes/books');
const userRoutes = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');

const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvs.forEach(key => {
  if (!process.env[key]) {
    console.error(`La variable d'environnement ${key} est manquante.`);
    process.exit(1);
  }
});
// Connexion à la BDD MangoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB établie'))
.catch(err => {
  console.error('Échec de la connexion MongoDB :', err);
  process.exit(1);
});

// Permet d'analyser le coprs requête et de le rendre exploitable
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use(errorHandler);
module.exports = app;