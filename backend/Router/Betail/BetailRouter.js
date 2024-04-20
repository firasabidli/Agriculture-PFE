// Routes/Culture.js
const express = require('express');
const router = express.Router();
const betailController = require('../../Controller/Betail/BetailController');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/assets/images/Betails");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post('/',upload.single("image_betail"), betailController.create);
router.get('/', betailController.all);
router.get('/:id', betailController.getBetailById);
router.put('/:id',upload.single("image_betail"), betailController.update);
router.delete('/:id', betailController.delete);
router.get('/categorieBetail/:id',betailController.categorieBetail);
module.exports = router;
