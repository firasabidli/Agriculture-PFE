const express = require('express');
const router = express.Router();
const ProfileController = require('../../Controller/Authentification/ProfileController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/Utilisateur/Admin/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put('/:id', upload.single('image'), ProfileController.update);

module.exports = router;
