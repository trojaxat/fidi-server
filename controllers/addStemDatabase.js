const handleAddStemDatabase = (req, res, db) => {
  const {
    email,
    name,
    hash,
    filetype,
    locked,
    downloadable,
    private,
  } = req.body;

  if (!email || !name || !hash || !filetype) {
    return res.status(400).json("One of the fields is empty");
  }

  db("stems")
    .insert({
      project_hash: hash,
      name: name,
      last_modified_email: email,
      last_modified_date: Date.now(),
      filetype: filetype,
      locked: locked,
      downloadable: downloadable,
      private: private,
    })
    .returning("*")
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => res.status(400).json("Stem file information not added"));
};

module.exports = {
  handleAddStemDatabase,
};
