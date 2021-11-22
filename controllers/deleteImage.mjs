export default function deleteImage(req, res, db) {
  const { email, link } = req.body;
  db("photos")
    .where({
      email: email,
      link: link,
    })
    .del()
    .then((link) => {
      return res.json(link[0]);
    })
    .catch((err) => res.status(400).json("Photo deleted"));
};
