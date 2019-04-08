const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
//Room
const {addRoomPage, addRoom} = require('./routes/rooms/addroom');
const {editRoom, editRoomPage} = require('./routes/rooms/editroom');
const {deleteRoom, deleteRoomPage} = require('./routes/rooms/deleteroom');
//Speaker
const {addSpeakerPage, addSpeaker} = require('./routes/speakers/addspeaker');
const {editSpeaker, editSpeakerPage} = require('./routes/speakers/editspeaker');
const {deleteSpeaker, deleteSpeakerPage} = require('./routes/speakers/deletespeaker');
//Time Points
const {addTimePage, addTime} = require('./routes/timepoints/addtime');
const {editTimePage, editTime} = require('./routes/timepoints/edittime');
const {deleteTimePage, deleteTime} = require('./routes/timepoints/deletetime');
//Sessions
const {addSessionPage, addSession} = require('./routes/sessions/addsession');
const {editSessionPage, editSession} = require('./routes/sessions/editsession');
const {deleteSessionPage, deleteSession} = require('./routes/sessions/deletesession');
//User Login
const {userLoginPage, userLogin} = require('./routes/user/userLogin');
//Counts
const {addCountsPage, addCounts} = require('./routes/counts/addcounts');

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'boston_code_camp'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//include css
app.use(express.static('css'));

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/index', getHomePage);
// Rooms
app.get('/addroom', addRoomPage);
app.get('/editroom', editRoomPage);
app.get('/deleteroom', deleteRoomPage);
app.post('/addroom', addRoom);
app.post('/editroom', editRoom);
app.post('/deleteroom', deleteRoom);
// Speaker
app.get('/addspeaker', addSpeakerPage);
app.get('/editspeaker', editSpeakerPage);
app.get('/deletespeaker', deleteSpeakerPage);
app.post('/addspeaker', addSpeaker);
app.post('/editspeaker', editSpeaker);
app.post('/deletespeaker', deleteSpeaker);
// TimePoint
app.get('/addtime', addTimePage);
app.get('/edittime', editTimePage);
app.get('/deletetime', deleteTimePage);
app.post('/addtime', addTime);
app.post('/edittime', editTime);
app.post('/deletetime', deleteTime);
// Session
app.get('/addsession', addSessionPage);
app.get('/editsession', editSessionPage);
app.get('/deletesession', deleteSessionPage);
app.post('/addsession', addSession);
app.post('/editsession', editSession);
app.post('/deletesession', deleteSession);
// User Login
app.get('/userLogin', userLoginPage);
app.post('/userLogin', userLogin);
// Counts
app.get('/addcounts', addCountsPage);
app.post('/addcounts', addCounts);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});