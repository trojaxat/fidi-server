export default function getUser(req, res, db) {
  const { user } = req.body;
  db("users")
    .select("email", "username")
    .from("users")
    .where("email", "=", user)
    .orWhere("username", "=", user)
    .then((response) => {
      res.send(response[0]);
    });
};
