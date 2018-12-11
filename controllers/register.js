const handleRegister = (req, res, db, bcrypt) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    let emailTaken;
    
    db.select('email')
        .from('users')
        .where('email', '=', email)
        .then(response => {
            emailTaken = response[0].email
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
            
            db.select('email')
                .from('users')
                .where('email', '=', email)
                .then(response => {
                return res.send(response[0])
            })
        }
    
    if (!email || !username || !password) {
        return  res.status(400).json('One of the fields is empty')
    } else if (emailTaken) {
        return  res.status(400).json('Username or email is taken')
    } else {
        return setTimeout(register, 1000);
    }
}

module.exports = {
    handleRegister
}