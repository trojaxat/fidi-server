export default function signIn(req, res, db, bcrypt) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("One of the fields is empty");
  }
  
  db.select("email", "hash")
    .from("users")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isCorrect = bcrypt.compareSync(req.body.password, data[0].hash);

      if (isCorrect) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.send(user[0]);
          })
          .catch((err) => {
            return res.status(400, res.json("No chance laddie"))
          });
      } else {
        return res.status(400, res.json("Nae chance password"));
      }
    })
    .catch((err) => {
      return res.status(400, res.json("Nae chance user"))
    });
};

//const saltRounds = bcrypt.genSaltSync(10);
//const givenPassword = bcrypt.hashSync(req.body.password, saltRounds);
//const isCorrect = bcrypt.compareSync(givenPassword, data[0].hash);
