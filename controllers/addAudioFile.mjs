// handles the database storage
import storageDestination from "../helpers/uploader.mjs";

export default function addAudioFile(req, res) {
  let upload = req.files.myfile;
  console.log('upload :', upload);
  // let storage = storageDestination(req, res);
  // let uploader = upload(storage);

    if (!upload) {
      res.status(400);
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.files) {
        return res.send("Please select a file to upload");
      } else if (err) {
        return res.send(err);
      }
    }

   // Use the mv() method to place the file somewhere on your server
   upload.mv(__dirname + '/uploads/' + upload.name, function(err) {
    if (err) {
      console.log('err :', err);
      return res.status(500).send(err);
    }
      res.send(`Files uploaded: ${req.body.hash}`);
    });
};
