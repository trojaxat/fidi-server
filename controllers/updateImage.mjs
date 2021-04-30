export default function updateImage(req, res, db) {
  const { name, email, link, place, id } = req.body;
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
    .then((link) => {
      return res.json(link[0]);
    })
    .catch((err) => res.status(400).json("Photo not added"));
};

