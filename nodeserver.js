// node js signin and signup server calls

var express = require("express");
var Client = require("node-rest-client").Client;
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var client = new Client();

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

//mangoose connect
mongoose.connect('mongodb://dbuser:1234@ds015892.mlab.com:15892/cmpe235');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to DB")
});

// Schema
var RegSchema = mongoose.Schema({
    name: String,
    phoneNum: String,
    username: String,
    password: String
}, { collection: 'teacher_credentials' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/login', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    var username = req.body.username;
    var password = req.body.password;
    var result = false;
    var collection = db.collection('teacher_credentials');
    collection.findOne({ username: username, password: password }, function (err, user) {
        if (err) {
            return res.json("{status : error}");
        }
        if (!user) return res.json("{status : could not find the user}");
        return res.json("{status : logged in}");
    });
});

app.post('/signup', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('inside signup');

    // Model
    var UserReg = mongoose.model('UserReg', RegSchema);
    var user = {
        name: req.body.name,
        phoneNum: req.body.phone_number,
        username: req.body.username,
        password: req.body.password
    };
    console.log('inside signup after user def');

    UserReg.create(user, function (err, newUser) {
        console.log('inside signup create');
        if (err) {
            console.log('error');
            res.json("{status :signup failure error}");
        };
        return res.json("{status : signup success}");
    });
});

//parameter: studentid
//returns a json with individual student info
app.post('/getstudent', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('inside getstudent');
    var studentId = req.body.studentid;
    // var result = false;
    var collection = db.collection('student_details');
    collection.findOne({ ID: studentId }, function (err, user) {
        if (err) {
            console.log('error at getstudent findOne');
            return res.json("{status : failure}");
        };
        if (!user) return res.send('Not logged in!');
        return res.json(user);
    });
});

// no params
// get all the student details as json
app.get('/getallstudents', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('inside getstudent');
    // var studentId = req.body.studentid;
    // var result = false;
    var collection = db.collection('student_details');
    collection.find().toArray(function (err, result) {
        if (err) {
            console.log('error in getallstudents');
        }
        else {
            console.log('all student details: ' + JSON.stringify(result));
        }
        res.json(result);
    });
});

//params: student id and grade 
app.post('/savestudentgrade', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('inside getstudent');
    var studentId = req.body.studentid;
    var studentgrade = req.body.grade;
    var collection = db.collection('student_details');
    collection.updateOne(
        { 'ID': studentId },
        { $set: { "Grade": studentgrade } },
        function (err, results) {
            if (err) {
                console.log('error at savestudentgrade update');
                res.json("{status : failure}");
            }
            console.log('success');
            res.json("{status : success}");
        });
});

app.get('/getgreensheet/:coursename', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log('inside getgreensheet');
    coursename = req.params.coursename;
    if (coursename == 'cmpe285') {
        res.sendFile("./cmpe285.html", { root: __dirname });
    }
    else if (coursename == 'cmpe235') {
        res.sendFile("./cmpe235.html", { root: __dirname });
    }
});


app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
console.log('Server Started on 8235');