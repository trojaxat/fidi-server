export default function updateImage(req, res, db) {
  const { name, email, link, place } = req.body;
  db("photos")
    .returning("*")
    .where({
      email: email,
      link: link,
    })
    .update({
      name: name,
      place: place,
    })
    .then((returnLink) => {
      return res.json(returnLink[0]);
    })
    .catch((err) => res.status(400).json("Photo not added"));
}

