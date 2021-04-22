// Handles the file downloading
const downloader = require("../helpers/downloader");

// The order of the where query builder if statements is relevant for knex
const handleGetSong = (req, res, db) => {
  const { email, hash, id, noFileReturn } = req.body;

  // The type of usersQueryBuilder is determined here
  let queryBuilder = db("audio_files").select("*");
  if (hash) {
    queryBuilder.where({
      hash: hash,
    });
  }

  // if no id, then it is a stem and in a sub folder
  let filePath = "public/uploads";
  if (id) {
    filePath = "public/uploads/" + hash;
    queryBuilder.where({
      id: id,
    });
  }

  // if user email address given and is therefore a track owner
  if (email) {
    queryBuilder.where({
      email: email,
    });
  }

  if (noFileReturn !== true) {
    queryBuilder
      .then((audio) => {
        return downloader.handleDownloadFilePath(filePath, audio[0], res);
      })
      .catch((err) => {
        console.log("err :", err);
        return res.status(400).json("Song error");
      });
  } else {
    queryBuilder
      .then((audio) => {
        res.json(audio[0]);
        return;
      })
      .catch((err) => {
        console.log("err :", err);
        return res.status(400).json("Song not in database");
      });
  }
};

module.exports = {
  handleGetSong,
};
