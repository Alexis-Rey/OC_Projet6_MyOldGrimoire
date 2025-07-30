const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');
const imagesOptimizer = require('../middleware/imagesOptimizer');
const {apiLimiter} = require('../middleware/rateLimit');

router.get('/bestrating', bookCtrl.GetBestBooks);
router.post('/' , apiLimiter, auth, multer,imagesOptimizer, bookCtrl.CreateBook);
router.delete('/:id',apiLimiter, auth, bookCtrl.DeleteBook);
router.put('/:id' , apiLimiter, auth, multer,imagesOptimizer, bookCtrl.ModifyBook);
router.get('/:id', bookCtrl.GetOneBook);
router.get('/', bookCtrl.GetAllBooks);
router.post('/:id/rating',apiLimiter, auth,bookCtrl.RatingBook);


module.exports = router;