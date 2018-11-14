// prevents issues with cross origin reading
const cors = require('cors'); 
// web application framework for node.js
const express = require('express');
// middleware to extract the body of incoming request
const bodyParser = require('body-parser');
// express initiates express.js framework for node.js
const app = express();
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with
// connects to database like node.js
const knex = require('knex');

const db = knex({
    client: 'mysql',
    version: '6.4',
  connection: {
    host : '127.0.0.1',
    port: '3306',
    user : 'root',
    password : '',
    database : 'fidi'
  }
});

db.select('*').from('users');

const database = {
    users: [
        {
            id: 123,
            username: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            username: 'Sally',
            email: 'sally@gmail.com',
            password: 'cake',
            entries: 0,
            joined: new Date()
        },
    ]
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
        //password needs to be hashed
        const { email, username, password } = req.body;
        console.log('const', req.body);
        database.users.push ({
            id: (database.users[database.users.length-1].id) + 1,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            entries: 0,
            joined: new Date()
        })
        db('users').insert({
            email : email,
            username: username,
            password: password,
            date: new Date()
        }).then(console.log)
        res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    console.log('id', id);
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    console.log('id', id);
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            // change to update user entries to be photo urls
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})

app.listen(3000, ()=> {
    console.log("Server Running");
})
