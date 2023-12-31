const express = require('express');
const path = require('path');

const router = express.Router();

const { createUserValidations } = require('../middlewares/userValidation');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        let imageName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({ storage });

const usersController = require('../controllers/usersController');

/* Obtener usuarios */
//router.get('/', usersController.index);

/* Obtener un usuario especifico */
router.get('/profile/:id', usersController.profile);

router.get('/login', usersController.login);


/* Crear usuario */
router.get('/register', usersController.register);
//router.post('/register', upload.single('imgPerfil'), createUserValidations, usersController.newUser);

/* Editar usuario */
router.get('/edit/:id', usersController.edit);
router.put('/:id', upload.single('imgPerfil'), usersController.update);

/* Eliminar usuario */
router.delete('/:id', usersController.delete);

/* Formulario login */
router.get('/login', usersController.login);
router.post('/login', usersController.loginProcess)


module.exports = router; 
