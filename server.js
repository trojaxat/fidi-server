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
// package.json file can change node server to nodemon server to test server on local host againa

// old mysql database from local host
//const db = knex({
//    client: 'mysql',
//    version: '6.4',
//  connection: {
//    host : '127.0.0.1',
//    user : 'root',
//    password : '',
//    database : 'fidi'
//  }
//});

const db = knex({
    client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});

app.use(bodyParser.json());
app.use(cors())

    
app.get('/', (req, res) => {
    return res.send('Heroku working')
    })

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return  res.status(400).json('One of the fields is empty')
    }
    db.select('email', 'hash').from('users')
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
    console.log('req.body', req.body);
    const hash = bcrypt.hashSync(password);
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    let id = 0;
    if (!email || !username || !password) {
        return  res.status(400).json('One of the fields is empty')
    }   
        const register = () => {
            db('users')
                .insert({
                    username: username,
                    email: email,
                    hash: hash,
                    entries: 0,
                    date: new Date()
            }).catch(err => res.status(400).json('Unable to register'))
            
            db('users').where('username', username).then(response => {
                res.send(response[0])
            })
        }
        return setTimeout(register, 1000);
})

app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    db.select('*').from('users').where({username})
        .then(response => {
         res.send(response[0])
    })
})

app.post('/image', (req, res) => {
    // need to change this for security reasons
    const { email } = req.body;
    db('photos')  
        .where('email', '=', email)
        .select('link')
        .limit(10)
        .bind(console)
        .then(links => {
        res.json(links)
        }).catch(err => res.status(400).json('Photos not received from database'))
})

app.post('/addImage', (req, res) => {
    const { email, link, place } = req.body;
    db('photos')  
        .where('email', '=', email)
        .insert({link: link, email: email, place: place})
        .then(response => response)
    db('photos')      
        .select('link')
        .where('place', '=', place)
        .then(link => {
        res.json(link[0])
        }).catch(err => res.status(400).json('Photos not added'))
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server is listening to port ${process.env.PORT}`);
})

// local host settings
//app.listen(3000, ()=> {
//    console.log(`Server is listening to port 3000`);
//})
