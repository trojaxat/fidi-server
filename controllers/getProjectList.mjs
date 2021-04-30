export default function getProjectList(req, res, db) {
  const { email } = req.body;
  let queryBuilder = db("audio_files").returning("*");

  if (email) {
    queryBuilder.where({
      email: email,
    });
  } else {
    queryBuilder.where({
      private: false,
    });
  }

  queryBuilder
    .then((projects) => {
      return res.json(projects);
    })
    .catch((err) => {
      return res.status(400).json("List error");
    });
};

