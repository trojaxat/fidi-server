export default function addStemDatabase(req, res, db) {
  const {
    last_modified_email,
    name,
    project_hash,
    filetype,
    locked,
    downloadable,
    privateValue,
  } = req.body;

  if (!last_modified_email || !name || !project_hash || !filetype) {
    return res.status(400).json("One of the fields is empty");
  }

  db("stems")
    .insert({
      project_hash: project_hash,
      name: name,
      last_modified_email: last_modified_email,
      last_modified_date: Date.now(),
      filetype: filetype,
      locked: locked,
      downloadable: downloadable,
      privateValue: privateValue,
    })
    .returning("*")
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => res.status(400).json("Stem file information not added"));
}
