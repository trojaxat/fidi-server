import md5 from "md5";

export default function addAudioDatabase(req, res, db) {
  const { email, name, privateValue } = req.body;
  
  if (!name) {
    return res.status(400).json("One of the fields is empty");
  }

  let lastModified = Date.now();
  let hash = md5(email + name);

  db("audio_files")
    .insert({
      hash: hash,
      name: name,
      privateValue: privateValue ? 1 : 0,
      email: email,
      last_modified: lastModified,
    })
    .returning("*")
    .then((response) => {
      res.json(response[0]);
    })
    .catch((err) => {
      return res.status(400).json("Audio file information not added");
    });
}
