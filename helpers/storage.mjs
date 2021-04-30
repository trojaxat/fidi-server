// // handles the database storage
import multer from "multer";
import uploadPath from "path";

// // Specific audio upload
export default function storageDestination() {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(null, filename(file, req.body.hash));
    },
  });
};

const filename = (file, hash) => {
  let pathExtension = uploadPath.extname(file.originalname);
  return hash + pathExtension;
};