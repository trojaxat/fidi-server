// handles the database storage
const uploader = require("../helpers/uploader");

const handleAddAudioFile = (req, res) => {
  var storage = uploader.handleStorage(req, res);
  var upload = uploader.handleUpload(storage);
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    return res.end("File is uploaded successfully!");
  });
};

module.exports = {
  handleAddAudioFile,
};
