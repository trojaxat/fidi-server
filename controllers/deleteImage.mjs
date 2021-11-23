export default function deleteImage(req, res, db) {
  const { email, link } = req.body;
  db("photos")
    .where({
      email: email,
      link: link,
    })
    .del()
    .then((linkResponse) => {
      return res.json(linkResponse[0]);
    })
    .catch((err) => res.status(400).json("Photo deleted"));
}
