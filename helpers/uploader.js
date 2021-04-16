// handles the database storage
const multer = require("multer");

// Specific audio upload
const handleStorage = (req, file, callback) => {
  return multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
      let uploadPath = require("path");
      uploadPath = uploadPath.extname(file.originalname);
      var str = file.originalname;
      var audioType = str.split(".").pop();
      callback(null, req.body.hash + "." + audioType);
    },
  });
};

// this has to keep myfile matching to the app information otherwise it doesnt work
const handleUpload = (storage) => {
  return multer({ storage: storage }).single("myfile");
};

module.exports = {
  handleStorage,
  handleUpload,
};
