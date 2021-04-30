export default function updateProject(req, res, db) {
  let queryBuilder = db("audio_files").returning("*");

  if (req.body.hash) {
    queryBuilder.where({
      hash: req.body.hash,
    });

    if (req.body.private) {
      queryBuilder.update({
        private: req.body.private,
      });
    }

    if (req.body.email) {
      queryBuilder.update({
        email: req.body.email,
      });
    }
  } else {
    return res.status(400).json("Project not found");
  }

  queryBuilder
    .then((response) => {
      return res.json(!!response);
    })
    .catch((err) => {
      return res.status(400).json("Project not changed");
    });
};
