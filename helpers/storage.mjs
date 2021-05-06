import uploadPath from "path";
import __dirname from './dir.mjs';

export default function storageDestination(upload, hash) {
  let basePath = __dirname + '\\public\\uploads\\';
  let fileExtension = uploadPath.extname(upload.name);
  return basePath + hash + fileExtension;
};
