const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  checkExtension: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype.toLowerCase())) {
      callback(null, true);
    } else {
      callback(
        new Error("Seuls ces formats sont acceptés: .jpg, .jpeg, et .png"),
        false
      );
    }
  },
});

module.exports = upload.single("image");
