const express = require("express");
const bookCtrl = require("../controllers/book");
const auth = require("../middleware/auth");
const { upload, processImage } = require("../middleware/multer-config");
const router = express.Router();

router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestThree);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, upload, processImage, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.put("/:id", auth, upload, processImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
