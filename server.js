/*
* Initialise dependancies
*/
const cors = require('cors'); // prevents issues with cross origin reading
const express = require('express'); // web application framework for node.js
const bodyParser = require('body-parser'); //body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with
const bcrypt = require('bcryptjs');// encryption to hash passwords
const knex = require('knex'); // connects to database like node.js
const ejs = require('ejs'); // embed JavaScript templates
const app = express(); // express initiates express.js framework for node.js

/*
* Initialise App
*/
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(cors());

/*
* Database
*/

//const db = knex({
//    client: 'pg',
//  connection: {
//    connectionString : process.env.DATABASE_URL,
//    ssl : true
//  }
//});

//old mysql database from local host
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

/*
* Controllers
*/
// Login
const register = require('./controllers/register');
const signin = require('./controllers/signin');

// Get from database
const getSong = require('./controllers/getSong');
const userGet = require('./controllers/userGet');
const getImage = require('./controllers/getImage');
const getComments = require('./controllers/getComments');
const getImageByLink = require('./controllers/getImageByLink');

// Load media
const playMediaServer = require('./controllers/playMediaServer');
const loadUserIcons = require('./controllers/loadUserIcons');

// Modify
const updateImage = require('./controllers/updateImage');
const deleteImage = require('./controllers/deleteImage');
const upvote = require('./controllers/upvote');

// Add to database
const addAudioDatabase = require('./controllers/addAudioDatabase');
const addAudioFile = require('./controllers/addAudioFile');
const addImage = require('./controllers/addImage');
const addPolitician = require('./controllers/addPolitician');
const addComment = require('./controllers/addComment');

// Query database
const searchTerm = require('./controllers/searchTerm');

/*
* Routes
*/

// Login
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// Get from database
app.get('/profile/:username', (req, res) => { userGet.handleUserget(req, res, db) })
app.post('/getSong', (req, res) => { getSong.handleGetSong(req, res, db) })
app.post('/getImage', (req, res) => { getImage.handleGetImage(req, res, db) })
app.post('/getImageByLink', (req, res) => { getImageByLink.handleGetImageByLink(req, res, db) })
app.post('/getComments', (req, res) => { getComments.handleGetComments(req, res, db) })

// Load media
app.get('/project/:id', (req, res) => { playMediaServer.handlePlayMediaServer(req, res, db) })
app.post('/loadUserIcons', (req, res) => { loadUserIcons.handleLoadUserIcons(req, res, db) })

// Modify
app.post('/updateImage', (req, res) => { updateImage.handleUpdateImage(req, res, db) })
app.delete('/deleteImage', (req, res) => { deleteImage.handleDeleteImage(req, res, db) })
app.post('/upvote', (req, res) => { upvote.handleUpvote(req, res, db) })

// Add to database
app.post('/addImage', (req, res) => { addImage.handleAddImage(req, res, db) })
app.post('/addAudioFile', (req, res) => { addAudioFile.handleAddAudioFile(req, res, db) })
app.post('/addAudioDatabase', (req, res) => { addAudioDatabase.handleAddAudioDatabase(req, res, db) })
app.post('/addComment', (req, res) => { addComment.handleAddComment(req, res, db) })
app.post('/addPolitician', (req, res) => { addPolitician.handleAddPolitician(req, res, db) })

// Query database
app.get('/', (req, res) => { return res.send('Heroku working') })
app.post('/searchTerm', (req, res) => { searchTerm.handleSearchTerm(req, res, db) })

/*
* Port settings
*/
if (process.env.PORT) {
    app.listen(process.env.PORT || 3030, ()=> { 
        console.log(`Server is listening to port ${process.env.PORT}`);
    })    
} else {
    app.listen(3030, ()=> { 
        console.log(`Server is listening to port ${3030}`);
    })
}


