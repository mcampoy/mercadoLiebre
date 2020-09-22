
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
var path = require('path');

// Requiero multer para la carga de los avatars
let multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Cambio el nombre de la carpeta para indicar dónde voy a guardar los avatars
      cb(null, 'public/images/avatars')
    },
        // Modifico estas líneas para agregar la extensión del archivo que se está subiendo antes tengo que requerir el paquete path
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })

  var upload = multer({ storage: storage })


router.get('/register', authController.register);
router.post('/register', upload.any(), authController.createUser);

router.get('/login', authController.login);
router.post('/login', authController.access);

router.get('/profile/:id', authController.profile)

module.exports = router;