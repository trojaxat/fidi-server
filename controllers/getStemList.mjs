export default function getStemList(req, res, db) {
  const { hash } = req.body;
  db("stems")
    .returning("*")
    .where({
      project_hash: hash,
    })
    .then((stems) => {
      return res.json(stems);
    })
    .catch((err) => {
      res.status(400).json("List error");
    });
};
