// prevents issues with cross origin reading
const cors = require('cors'); 
// web application framework for node.js
const express = require('express');
//body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with
const bodyParser = require('body-parser');
// encryption to hash passwords
const bcrypt = require('bcryptjs');
// express initiates express.js framework for node.js
const app = express();
// connects to database like node.js
const knex = require('knex');
// package.json file can change node server to nodemon server to test server on local host againa


//Controllers
const register = require('./controllers/register');
const searchTerm = require('./controllers/searchTerm');
const signin = require('./controllers/signin');
const userGet = require('./controllers/userGet');
const addImage = require('./controllers/addImage');
const addComment = require('./controllers/addComment');
const updateImage = require('./controllers/updateImage');
const deleteImage = require('./controllers/deleteImage');
const getImage = require('./controllers/getImage');
const getComments = require('./controllers/getComments');
const getImageByLink = require('./controllers/getImageByLink');
const loadUserIcons = require('./controllers/loadUserIcons');
const upvote = require('./controllers/upvote');


const db = knex({
    client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});

////old mysql database from local host
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

app.use(bodyParser.json());
app.use(cors())
 
app.get('/', (req, res) => { return res.send('Heroku working') })

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:username', (req, res) => { userGet.handleUserget(req, res, db) })
    
app.post('/loadUserIcons', (req, res) => { loadUserIcons.handleLoadUserIcons(req, res, db) })

app.post('/addImage', (req, res) => { addImage.handleAddImage(req, res, db) })

app.post('/addComment', (req, res) => { addComment.handleAddComment(req, res, db) })

app.post('/getImage', (req, res) => { getImage.handleGetImage(req, res, db) })

app.post('/getComments', (req, res) => { getComments.handleGetComments(req, res, db) })

app.post('/searchTerm', (req, res) => { searchTerm.handleGetComments(req, res, db) })

app.post('/getImageByLink', (req, res) => { getImageByLink.handleGetImageByLink(req, res, db) })

app.post('/updateImage', (req, res) => { updateImage.handleUpdateImage(req, res, db) })

app.delete('/deleteImage', (req, res) => { deleteImage.handleDeleteImage(req, res, db) })

app.post('/upvote', (req, res) => { upvote.handleUpvote(req, res, db) })
    
app.listen(process.env.PORT || 3000, ()=> { 
    console.log(`Server is listening to port ${process.env.PORT}`);
})

//app.listen(3000, ()=> { 
//    console.log(`Server is listening to port 3000`);
//})

