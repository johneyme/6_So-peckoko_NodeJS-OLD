const multer = require('multer'); // importation du package multer

// CONFIGURATION MULTER POUR ENREGISTREMENT DES IMAGES 

// gestion du type MIME des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// destination enregistrement image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // nommage unique des images
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },

});

module.exports = multer({storage: storage}).single('image');