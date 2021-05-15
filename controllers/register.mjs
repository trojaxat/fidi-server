export default function register(req, res, db, bcrypt) {
  const { email, username, password } = req.body;
  const hash = bcrypt.hashSync(password);

  if (!email || !username || !password) {
    return res.status(400).json("One of the fields is empty");
  }

    db("users")
    .insert({
      username: username,
      email: email,
      hash: hash,
      entries: 0,
      date: new Date(),
    })
    .returning("email")
    .then((response) => {
      return db
      .select("*")
      .from("users")
      .where("email", "=", req.body.email)
      .then((user) => {
        res.send(user[0]);
      })
    })
    .catch((err) => res.status(400).json("Unable to register"));
};

// Need to add salt later
//    const myPlaintextPassword = req.body.password;
//    const saltRounds = bcrypt.genSaltSync(10);
//    const hash = bcrypt.hashSync(password, saltRounds);
