export default function loadUserIcons(req, res, db) {
  // need to change this for security reasons
  // change limit 10 to extend the amount of previous photos visible
  const { email } = req.body;
  db("photos")
    .where("email", "=", email)
    .orderBy("id", "desc")
    .select("id", "link", "place")
    .bind(console)
    .then((links) => {
      return res.json(links);
    })
    .catch((err) => res.status(400).json("Photos not received from database"));
};

