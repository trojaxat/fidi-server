export default function addImage(req, res, db) {
  const { email, link, place, id } = req.body;
  db("photos")
    .returning("*")
    .where("email", "=", email)
    .insert({
      link: link,
      email: email,
      place: place,
      id: id,
    })
    .then((linkResponse) => {
      return res.json(linkResponse[0]);
    })
    .catch((err) => res.status(400).json("Photo not added"));
}
