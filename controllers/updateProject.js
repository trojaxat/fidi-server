const handleUpdateProject = (req, res, db) => {
  const { hash, private } = req.body;
  db("audio_files")
    .returning("*")
    .where({
      hash: hash,
    })
    .update({
      private: private,
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      return res.status(400).json("Privacy state not changed");
    });
};

module.exports = {
  handleUpdateProject,
};
