export default function getImage(req, res, db) {
  const { email, name, place } = req.body;
  db("photos")
    .returning("*")
    .where({
      email: email,
    })
    .andWhere({
      name: name,
    })
    .orWhere({
      place: place,
    })
    .then((link) => {
      return res.json(link[0]);
    })
    .catch((err) => res.status(400).json("Photo not found"));
}
