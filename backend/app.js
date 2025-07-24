const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('MONGODB_URI non défini dans backend/.env');
  process.exit(1);
}
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à MongoDB établie'))
.catch(err => {
  console.error('Échec de la connexion MongoDB :', err);
  process.exit(1);
});
// const path = require('path');
// const stuffRoutes = require('./routes/stuff');
// const userRoutes = require('./routes/user');
// Permet d'analyser le coprs requête et de le rendre exploitable
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use('/images', express.static(path.join(__dirname,'images')));
// app.use('/api/stuff', stuffRoutes);
// app.use('/api/auth', userRoutes);

app.use('/api/books', (req, res, next) => {

  const books = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      genre: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      year: 4900,
      author: "Martinne",
      averageRating : 4,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      genre: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      year: 2900,
      author: "François",
      averageRating :2.5,
      userId: 'qsomihvqios',
    },
  ];
  res.status(200).json(books);
});
module.exports = app;