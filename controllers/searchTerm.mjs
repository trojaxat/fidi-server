export default function searchTerm(req, res, db) {
  const { searchTermValue } = req.body;

  db("politicians")
    .returning("name")
    .where({
      name: searchTermValue,
    })
    .then((politician) => {
      return res.json(politician);
    })
    .catch((err) => res.status(400).json("Politicians not found"));
}

