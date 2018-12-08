const handleRegister = (db, bcrypt, req, res) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    let emailTaken = true;
    
    db.select('*').from('users').where({username})
        .then(response => {
         res.send(response[0])
         if (response[0].email) {
            emailTaken = false
            return emailTaken
         }
    })
    
    const register = () => {
            db('users')
                .insert({
                    username: username,
                    email: email,
                    hash: hash,
                    entries: 0,
                    date: new Date()
            }).catch(err => res.status(400).json('Unable to register'))
            
            db('users').where('email', email).then(response => {
                res.send(response[0])
            })
        }
    
    if (!email || !username || !password) {
        return  res.status(400).json('One of the fields is empty')
    } else if (!emailTaken) {
        return  res.status(400).json('Email already used')
    } else {
        return setTimeout(register, 1000);
    }
}

module.exports = {
    handleRegister
}