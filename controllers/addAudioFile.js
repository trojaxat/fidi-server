// handles the database storage
const uploader = require("../helpers/uploader");

const handleAddAudioFile = (req, res) => {
  let storage = uploader.handleStorageDestination(req, res);
  let upload = uploader.handleUpload(storage);

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (err) {
      res.status(400);
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.files[0]) {
        return res.send("Please select a file to upload");
      } else if (err) {
        return res.send(err);
      }
    }

    res.send(`Files uploaded: ${req.body.hash}`);
  });
};

module.exports = {
  handleAddAudioFile,
};
