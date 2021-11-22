export default function uploader(res, upload, storagePath) {
   return upload.mv(storagePath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
      res.send(`File uploaded`);
    });
};

