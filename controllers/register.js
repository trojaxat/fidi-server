const handleRegister = (req, res, db, bcrypt) => {
    const { email, username, password } = req.body;
    const myPlaintextPassword = req.body.password;
    const saltRounds = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, saltRounds);
    
    if (!email || !username || !password) {
        return  res.status(400).json('One of the fields is empty')
    }
        db('users')
          .insert({
                username: username,
                email: email,
                hash: hash,
                entries: 0,
                date: new Date()
          })
          .returning('email')
          .then(response => {
            res.json(response);
        }).catch(err => res.status(400).json('Unable to register')) 
}


//db.select('email')
//        .from('users')
//        .where('email', '=', email)
//        .then(response => {
//            emailTaken = response[0].email
//         })
//    
//    const register = () => {
//            db('users')
//                .insert({
//                    username: username,
//                    email: email,
//                    hash: hash,
//                    entries: 0,
//                    date: new Date()
//            }).catch(err => res.status(400).json('Unable to register'))
//            
//            db.select('email')
//                .from('users')
//                .where('email', '=', email)
//                .then(response => {
//                return res.send(response[0])
//            })
//        }

module.exports = {
    handleRegister
}