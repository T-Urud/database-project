const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// objet de configuration multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
    // null => pas d'erreur et 'images' => nom du dossier en 2e argument
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split("").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    // génère nouveau nom unique pour le fichier
  },
});

module.exports = multer({ storage }).single("image");
