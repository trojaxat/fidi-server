// handles the database storage
import storageDestination from "../helpers/storage.mjs";
import uploader from "../helpers/uploader.mjs";

export default function addAudioFile(req, res) {
  let upload = req.files.myfile;
  // let storage = storageDestination(req, res);
  // let uploader = upload(storage);
  let storagePath = storageDestination(upload);
  console.log('storagePath :', storagePath);

  if (!upload || !storagePath) {
    res.status(400);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files) {
      return res.send("Please select a file to upload");
    } else if (err) {
      return res.send(err);
    }
  }

  uploader(res, upload, storagePath);
};
