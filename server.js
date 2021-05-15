/*
 * Initialise dependancies
 */
import cors from "cors"; // prevents issues with cross origin reading
import express from "express"; // web application framework for node.js
import bcrypt from "bcryptjs"; // encryption to hash passwords
import knex from "knex"; // connects to database like node.js
import ejs from "ejs"; // embed JavaScript templates
import fileUpload from 'express-fileupload';
import __dirname from './helpers/dir.mjs';

/*
 * Initialise App
 */
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(__dirname + "/public/uploads/"));

/*
 * Controllers
 */
// Login
import register from  "./controllers/register.mjs";
import signIn from  "./controllers/signin.mjs";

// Get from database
import getSong from  "./controllers/getSong.mjs";
import getUser from  "./controllers/getUser.mjs";
import getImage from  "./controllers/getImage.mjs";
import getComments from  "./controllers/getComments.mjs";
import getProjectList from  "./controllers/getProjectList.mjs";
import getStemList from  "./controllers/getStemList.mjs";
import getImageByLink from  "./controllers/getImageByLink.mjs";

// Load media
import playMediaServer from  "./controllers/playMediaServer.mjs";
import loadUserIcons from  "./controllers/loadUserIcons.mjs";

// Modify
import updateImage from  "./controllers/updateImage.mjs";
import updateProject from  "./controllers/updateProject.mjs";
import updateStem from  "./controllers/updateStem.mjs";
import deleteImage from  "./controllers/deleteImage.mjs";
import upvote from  "./controllers/upvote.mjs";

// Add to database
import addAudioDatabase from  "./controllers/addAudioDatabase.mjs";
import addStemDatabase from  "./controllers/addStemDatabase.mjs";
import addAudioFile from  "./controllers/addAudioFile.mjs";
import addImage from  "./controllers/addImage.mjs";
import addSubscription from  "./controllers/addSubscription.mjs";
import addPolitician from  "./controllers/addPolitician.mjs";
import addComment from  "./controllers/addComment.mjs";

// Query database
import searchTerm from  "./controllers/searchTerm.mjs";

/*
 * Routes
 */

// Login
app.post("/signin", (req, res) => {
  signIn(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register(req, res, db, bcrypt);
});

// Get from database
app.post("/getUser", (req, res) => {
  getUser(req, res, db);
});
app.post("/getSong", (req, res) => {
  getSong(req, res, db);
});
app.post("/getImage", (req, res) => {
  getImage(req, res, db);
});
app.post("/getImageByLink", (req, res) => {
  getImageByLink(req, res, db);
});
app.post("/getProjectList", (req, res) => {
  getProjectList(req, res, db);
});
app.post("/getStemList", (req, res) => {
  getStemList(req, res, db);
});
app.post("/getComments", (req, res) => {
  getComments(req, res, db);
});

// Load media
app.post("/project/:id", (req, res) => {
  playMediaServer(req, res, db);
});
app.get("/project/:id", (req, res) => {
  playMediaServer(req, res, db);
});
app.post("/loadUserIcons", (req, res) => {
  loadUserIcons(req, res, db);
});

// Modify
app.post("/updateImage", (req, res) => {
  updateImage(req, res, db);
});
app.post("/updateProject", (req, res) => {
  updateProject(req, res, db);
});
app.post("/updateStem", (req, res) => {
  updateStem(req, res, db);
});
app.delete("/deleteImage", (req, res) => {
  deleteImage(req, res, db);
});
app.post("/upvote", (req, res) => {
  upvote(req, res, db);
});

// Add to database
app.post("/addImage", (req, res) => {
  addImage(req, res, db);
});
app.post("/addSubscription", (req, res) => {
  addSubscription(req, res, db);
});
app.post("/addAudioFile", (req, res) => {
  addAudioFile(req, res, db);
});
app.post("/addAudioDatabase", (req, res) => {
  addAudioDatabase(req, res, db);
});
app.post("/addStemDatabase", (req, res) => {
  addStemDatabase(req, res, db);
});
app.post("/addComment", (req, res) => {
  addComment(req, res, db);
});
app.post("/addPolitician", (req, res) => {
  addPolitician(req, res, db);  
});

// Query database
app.get("/", (req, res) => {
  return res.send("Heroku working");
});
app.post("/searchTerm", (req, res) => {
  searchTerm(req, res, db);
});

/*
 * Database
 */
let db;
if (process.env.PORT) {
  console.log("This is the host server");
  db = knex({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
  });
} else {
  //old mysql database from local host
  console.log("This is the local server");
  db = knex({
    client: "mysql",
    version: "6.4",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "fidi",
    },
  });
}

/*
 * Port settings
 */
if (process.env.PORT) {
  app.listen(process.env.PORT || 3030, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
  });
} else {
  app.listen(3030, () => {
    console.log(`Server is listening to port ${3030}`);
  });
}
