// // handles the database storage
import multer from "multer";

// // this has to keep myfile matching to the app information otherwise it doesnt work
export default function upload (storage) {
  return multer({
    storage: storage,
  }).any("myfile");
};

