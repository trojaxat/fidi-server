const http = require('http');
const fs = require('fs');

const handleDownloadFile = (url) => {
    let fileType = audio[0].name.split('.').pop();
    let songPath = path.resolve("public/uploads")
    let fileName = hash + "." + fileType;
    res.type(fileType);
    return res.download(songPath + "//" + fileName, fileName, (err) => {
      });
}

module.exports = {
    handleDownloadFile
    }
