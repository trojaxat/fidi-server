export default function addComment(req, res, db) {
  const { email, comment, link, id } = req.body;
  db("comments")
    .returning("*")
    .where("email", "=", email)
    .insert({
      comment: comment,
      email: email,
      link: link,
      id: id,
      score: 1,
    })
    .then((linkResponse) => {
      return res.json(linkResponse[0]);
    })
    .catch((err) => res.status(400).json("Photo not added"));
}
