import multer from "multer";

//store uploaded images in memory
const storage = multer.memoryStorage();

//allowed image formats
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

//accept only images files
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and WebP images are allowed"), false);
  }
};

//configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb per image
  },
});

export default upload;
