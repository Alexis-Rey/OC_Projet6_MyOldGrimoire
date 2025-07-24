const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');

router.post('/',auth, multer, bookCtrl.CreateBook);
router.delete('/:id',auth, bookCtrl.DeleteBook);
router.put('/:id',auth, multer,  bookCtrl.ModifyBook);
router.get('/:id', bookCtrl.GetOneBook)
router.get('/', bookCtrl.GetAllBooks);

module.exports = router;