// Handles the file downloading
var songPath = require("path");
const downloader = require("../helpers/downloader");

const handleGetSong = (req, res, db) => {
  const { email, hash, id } = req.body;

  // The type of usersQueryBuilder is determined here
  let queryBuilder = db("audio_files").select("*");

  // if no id, then it is a stem and in a sub folder
  let filePath = "public/uploads";
  if (id) {
    filePath = "public/uploads/" + hash;
    queryBuilder.where({
      id: id,
    });
  }

  // if user email address given and is a track owner or is a collaborator
  if (email) {
    queryBuilder.where({
      email: email,
    });
  } else {
    queryBuilder.where({
      private: false,
    });
  }

  // if no user email, condition of no private tracks
  queryBuilder
    .then((audio) => {
      let fileType = audio[0].name.split(".").pop();
      let songPath = path.resolve(filePath);
      let fileName = hash + "." + fileType;
      res.type(fileType);
      return res.download(songPath + "//" + fileName, fileName);
    })
    .catch((err) => res.status(400).json("Song error"));
};

module.exports = {
  handleGetSong,
};
