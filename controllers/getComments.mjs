export default function getComments(req, res, db) {
  const { link, id } = req.body;
  db("comments")
    .returning("comment")
    .where({
      id: id,
    })
    .andWhere({
      link: link,
    })
    .then((linkResponse) => {
      return res.json(linkResponse);
    })
    .catch((err) => res.status(400).json("Comments not found"));
}
