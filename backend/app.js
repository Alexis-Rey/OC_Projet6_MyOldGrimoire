const express = require('express');
// const mongoose = require('mongoose');

const app = express();
// const path = require('path');
// const stuffRoutes = require('./routes/stuff');
// const userRoutes = require('./routes/user');
// Permet d'analyser le coprs requête et de le rendre exploitable
app.use(express.json());

// Logique connextion mangodb
// mongoose.connect('mongodb+srv://alex:alex159357@cluster0.1u0201v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

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