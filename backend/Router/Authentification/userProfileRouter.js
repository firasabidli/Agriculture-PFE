const express = require('express');
const router = express.Router();
const userProfileController = require('../../Controller/Authentification/userProfileController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/images/Utilisateur/Agriculteur/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put('/:id', upload.single('image'), userProfileController.update);
router.put('/editPassword/:id', userProfileController.updatePassword);

module.exports = router;
