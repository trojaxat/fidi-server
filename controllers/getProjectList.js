const handleGetProjectList = (req, res, db) => {
  const { email } = req.body;
  db("audio_files")
    .returning("*")
    .where({
      email: email,
    })
    .then((projects) => {
      return res.json(projects);
    })
    .catch((err) => res.status(400).json("List error"));
};

module.exports = {
  handleGetProjectList,
};
