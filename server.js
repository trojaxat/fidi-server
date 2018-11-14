// prevents issues with cross origin reading
const cors = require('cors'); 
// connects to database like node.js
const knex = require('knex'); 
// web application framework for node.js
const express = require('express');
// middleware to extract the body of incoming request
const bodyParser = require('body-parser');
// express initiates express.js framework for node.js
const app = express();
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with
const database = {
    users: [
        {
            id: 123,
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Sally',
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
        const { email, name, password } = req.body;
        database.users.push ({
            id: (database.users[database.users.length-1].id) + 1,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            entries: 0,
            joined: new Date()
        })
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
