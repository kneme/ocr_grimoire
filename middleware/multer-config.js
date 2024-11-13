const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  checkExtension: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error("Seuls ces formats sont acceptés: .jpg, .jpeg, et .png"),
        false
      );
    }
  },
});

const processImage = (req, res, next) => {
  if (!req.file) return next();
  const filePath = `images/${Date.now()}-${
    path.parse(req.file.originalname).name
  }.webp`;
  sharp(req.file.buffer)
    .toFormat("webp")
    .webp({ quality: 20 })
    .toFile(filePath)
    .then(() => {
      req.file.filename = path.basename(filePath);
      req.file.path = filePath;
      next();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = {
  upload: upload.single("image"),
  processImage,
};
