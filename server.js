// prevents issues with cross origin reading
const cors = require('cors'); 
// web application framework for node.js
const express = require('express');
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with
const bodyParser = require('body-parser');
// encryption to hash passwords
const bcrypt = require('bcrypt-nodejs');
// express initiates express.js framework for node.js
const app = express();
// connects to database like node.js
const knex = require('knex');

const db = knex({
    client: 'mysql',
    version: '6.4',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'fidi'
  }
});

const database = {
    users: []
}

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
        res.send(database.users);
})

app.post('/signin', (req, res) => {
        if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400, res.json('No chance laddie'));
        }
})
            
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    

        database.users.push ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            entries: 0,
            date: new Date()
        })
        
        db('users')
            .insert({
            email : email,
            username: username,
            password: hash,
            date: new Date()
        }).catch(err => res.status(400).json('Unable to register'))
        
        db('users').where('username', username).then(response => {
            res.json(response)
        })
})

app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    db.select('*').from('users').where({username})
        .then(response => {
         res.send(response[0])
    })
})

app.post('/image', (req, res) => {
    const { email } = req.body;
    db('users')
        .where('email', '=', email)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries)
        })
    db('users')
        .where('email', '=', email)
        .select('entries')
        .then(response => {
            res.json(response[0].entries)
        })
})

app.listen(3000, ()=> {
    console.log("Server Running");
})
