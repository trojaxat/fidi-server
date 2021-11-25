export default function getProjectList(req, res, db) {
  const { email } = req.body;
  let queryBuilder = db("audio_files").returning("*");

  if (email) {
    queryBuilder.where({
      email: email,
    });
  } else {
    // private has to be 0 for postgresql not for mysql
    queryBuilder.where({
      privateValue: 0,
    });
  }

  queryBuilder
    .then((projects) => {
      return res.json(projects);
    })
    .catch((err) => {
      return res.status(400).json("List error");
    });
}

