// Routes/Culture.js
const express = require('express');
const router = express.Router();
const agricultureController = require('../../Controller/Agriculture/AgricultureController');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/images/Agricultures");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post('/',upload.single("image_agriculture"), agricultureController.create);
router.get('/', agricultureController.all);
router.get('/:id', agricultureController.getAgricultureById);
router.put('/:id',upload.single("image_agriculture"), agricultureController.update);
router.delete('/:id', agricultureController.delete);
module.exports = router;
