import downloadPath from "path";

export default function downloader(filePath, file, res) {
  if (file.name && file.hash) {
    let fileType = file.name.split(".").pop();
    let path = downloadPath.resolve(filePath);
    let fileName = file.hash + "." + fileType;
    filePath = path + "\\" + fileName;
    return res.download(filePath, fileName);
  } else {
    return res.status(400).json("File information not found");
  }
};
