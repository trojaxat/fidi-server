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

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(response => {
         res.send(response[0])
    })
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
        const isCorrect = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isCorrect) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                 res.send(user[0])
            }).catch(err => res.status(400, res.json('No chance laddie')))
        } else {
            res.status(400, res.json('Nae chance password'))
        }
    }).catch(err => res.status(400, res.json('Nae chance user')))
})
            
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    let id = 0;
        
        db.select('*').from('users').then(response => {
            id = response.length  
        }).catch(err => res.status(400).json('Unable to connect to database'))
    
        db('users')
            .insert({
            entries: 0,
            email : email,
            username: username,
            date: new Date()
        }).catch(err => res.status(400).json('Unable to register user'))
        
        const login = () => {
            console.log('id', id);
            db('login')
            .insert({
                hash: hash,
                email: email,
                id: id
            }).catch(err => res.status(400).json('Unable to register login'))

            db('users').where('username', username).then(response => {
                res.send(response[0])
            })
        }
        return setTimeout(login, 1000);
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
