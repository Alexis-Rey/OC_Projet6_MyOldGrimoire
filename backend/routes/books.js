const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');
const imagesOptimizer = require('../middleware/imagesOptimizer');

router.post('/',auth, multer,imagesOptimizer, bookCtrl.CreateBook);
router.delete('/:id',auth, bookCtrl.DeleteBook);
router.put('/:id',auth, multer,imagesOptimizer, bookCtrl.ModifyBook);
router.get('/:id', bookCtrl.GetOneBook)
router.get('/', bookCtrl.GetAllBooks);

module.exports = router;