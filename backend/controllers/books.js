const Book = require('../models/book');
const fs = require('fs');

exports.CreateBook = (req,res,next) => {
  // lors de la récupération d'un fichier venant d'un utilsateur le corps de la requête est différents, on reçoie un objet Json sous forme de String que l'on doit donc parser
  const bookObject = JSON.parse(req.body.book);
  delete bookObject.id;
  delete bookObject.userId;
  // on initialise un nouveau livre qui contient l'id utilsateur et le chemin de l'image à afficher
  const book= new Book({
    ...bookObject,
    userId : req.auth.userId,
    /*  Gestion du chemin url ici avec : 
        req.protocol :  permet de récuperer le protocol utiliser soit http
        req.get('host') : qui nous permet de récupérer l'hote soit dans notre cas du test 'localhost:4000'
        /images : est simplement le dossier qui contient les images 
        req.file.filename : nom du fichier récupérer */
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  book.save()
  .then(()=> res.status(201).json({message:'Objet enregistré avec succès'}))
  .catch(error => res.status(400).json({error}))};

  /* Fonction de suppresion d'un livre
  On reprends le même principe que pour la modification en terme de recherche dans la BDD et de vérification des droits
  Puis grâce à la méthode unlink on suppime l'image correpondant au livre que l'on souhaite supprimer et on appel en callback 
  la fonction pour supprimer également le livre de la base de donné une fois la suppresion image faite */
exports.DeleteBook= (req,res,next)=>{
     Book.findOne({ _id: req.params.id})
       .then(book => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = book.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                   Book.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};

/*  Middleware qui permet de modifier un livre déjà créer, d'abord on verifie la présence d'un fichier chargé par l'utilsateur dans la requête:
- si oui on parse les informations
- si non on récupère simplement le coprs de la requête.
Ensuite on viens regarder dans la BDD si le livre à modifier est la en cherchant grâce à l'idee transmise en paramètre d'url puis si l'utilisateur qui fait cette requête 
est également l'auteur de ce livre et à la permisssion de le faire. En comparant son id issu du token d'identification avec l'id de la base de données associé au livre au moment de sa création
Si tel est le cas on procède à la modification du livre avec les informations reçu dans la requête*/
exports.ModifyBook = (req,res,next)=>{
  const bookObject = req.file ? {
       ...JSON.parse(req.body.book),
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };

   delete bookObject._userId;

   Book.findOne({_id: req.params.id})
       .then((book) => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else {
            // Ajout perso, on vérifie que lors de la modif objet il y a une nouvelle image: si oui on supprime l'ancienne sinon on la conserve pour la modif
            const delOldBook = book.imageUrl.split('/images/')[1];
              if(req.file){
                fs.unlink(`images/${delOldBook}`, () =>{
                  Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié avec nouvelle image !'}))
                .catch(error => res.status(401).json({ error }));
                })
              } else{
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié !'}))
                .catch(error => res.status(401).json({ error }));
              }
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
};

exports.GetOneBook = (req,res,next)=>{
  Book.findOne({ _id : req.params.id}).then(book =>res.status(200).json(book)).catch(error => res.status(404).json({error}));
};

exports.GetAllBooks = (req, res, next) => {
  Book.find().then(books => res.status(200).json(books)).catch(error => res.status(400).json({error}));
};