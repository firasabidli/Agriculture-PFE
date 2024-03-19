
const express = require('express');
const router = express.Router();
const MaterielController = require('../../Controller/Agriculture/MaterielController');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/',upload.single("image_materiel"), MaterielController.create);
router.get('/', MaterielController.all);
router.get('/:id', MaterielController.getMaterielById);
router.get('/search', MaterielController.search);
router.put('/:id',upload.single("image_materiel"), MaterielController.update);
router.delete('/:id', MaterielController.delete);

module.exports = router;