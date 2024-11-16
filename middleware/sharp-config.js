const sharp = require("sharp");
const path = require("path");

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

module.exports = processImage;
