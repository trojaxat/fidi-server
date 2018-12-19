const handleRegister = (req, res, db, bcrypt) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    let emailTaken;
    
    if (!email || !username || !password) {
        return  res.status(400).json('One of the fields is empty')
    } else if (emailTaken) {
        return  res.status(400).json('Username or email is taken')
    } else {
        db.transaction(trx => {
          trx.insert({
                username: username,
                email: email,
                hash: hash,
                entries: 0,
                date: new Date()
          })
          .into('users')
          .returning('email')
          .then(response => {
            res.json(user[0]);
              })
          })
          .then(trx.commit)
          .catch(trx.rollback)
        }.catch(err => res.status(400).json('unable to register')) 
    }
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