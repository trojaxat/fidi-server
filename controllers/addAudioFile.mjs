// handles the database storage
import storageDestination from "../helpers/uploader.mjs";
import upload from "../helpers/uploader.mjs";

export default function addAudioFile(req, res) {
  let storage = storageDestination(req, res);
  let uploader = upload(storage);

  uploader(req, res, function (err) {
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
