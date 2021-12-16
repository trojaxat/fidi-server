export default function signIn(req, res, db, bcrypt) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("One of the fields is empty");
  }

  db("users")
    .returning("*")
    .where("email", "=", req.body.email)
    .select("*")
    .then((data) => {
      if(Array.isArray(data) && data.length == 0) {
        return res.status(400).json("There is no user");
      }

      const isCorrect = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isCorrect) {
        return res.send(data[0]);
      } else {
        return res.status(400).json("Password is incorrect");
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
        message: "Server Error",
      });
    });
}

//const saltRounds = bcrypt.genSaltSync(10);
//const givenPassword = bcrypt.hashSync(req.body.password, saltRounds);
//const isCorrect = bcrypt.compareSync(givenPassword, data[0].hash);
