const handleAddAudioDatabase = (req, res, db) => {
  const { email, name, hash, private } = req.body;
  if (!name || !hash) {
    return res.status(400).json("One of the fields is empty");
  }

  let lastModified = req.body.lastModified;
  if (!lastModified) {
    lastModified = Date.now();
  }

  db("audio_files")
    .insert({
      hash: hash,
      name: name,
      private: private,
      email: email,
      last_modified: lastModified,
    })
    .returning("*")
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => {
      return res.status(400).json("Audio file information not added");
    });
};

module.exports = {
  handleAddAudioDatabase,
};