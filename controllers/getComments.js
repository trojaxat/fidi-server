const handleGetComments = (req, res, db) => {
  const { link, id } = req.body;
  db("comments")
    .returning("comment")
    .where({
      id: id,
    })
    .andWhere({
      link: link,
    })
    .then((link) => {
      return res.json(link);
    })
    .catch((err) => res.status(400).json("Comments not found"));
};

module.exports = {
  handleGetComments,
};
