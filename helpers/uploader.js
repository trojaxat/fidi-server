// // handles the database storage
const multer = require("multer");

// // Specific audio upload
const handleStorageDestination = () => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(null, handleFilename(file, req.body.hash));
    },
  });
};

const handleFilename = (file, hash) => {
  let uploadPath = require("path");
  let pathExtension = uploadPath.extname(file.originalname);
  return hash + pathExtension;
};

// // this has to keep myfile matching to the app information otherwise it doesnt work
const handleUpload = (storage) => {
  return multer({
    storage: storage,
  }).any("myfile");
};

module.exports = {
  handleStorageDestination,
  handleUpload,
};