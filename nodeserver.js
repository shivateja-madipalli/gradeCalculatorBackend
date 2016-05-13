// node js signin and signup server calls

var express = require("express");
var Client = require("node-rest-client").Client;
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var authy = require('authy')("NTcGeRu0Jgiby5KIwf2HqzZF32oYft5G");

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
  password: String,
  authyId: String
}, { collection: 'teacher_credentials' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/login', function (req, res) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  var username = req.body.username;
  var password = req.body.password;
  var result = false;
  var collection = db.collection('teacher_credentials');
  collection.findOne({ username: username, password: password }, function (err, user) {
    if (err) {
      return res.json("{status : error}");
    }
    if (!user) {
      return res.status(401).json("{status : could not find the user}")
    };
    //working on authy stuff

    console.log('authy id: ' + user.authyId);
    authy.request_sms(user.authyId, function(err, response) {
      console.log('response from authy: ' + JSON.stringify(response));
      return res.status(200).json("{status : success}");
    });

  });
});

app.post('/signup', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
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


  //creating auth id from API CALL

  authy.register_user(user.username, user.phoneNum, '+1', function (err, response) {
    if (err) {
      //response.json(err);
      console.log(err);
      return;
    }
    user.authyId = response.user.id;

    console.log('whole user Obj: ' + JSON.stringify(user));

    UserReg.create(user, function (err, newUser) {
      console.log('inside signup create');
      if (err) {
        console.log('error');
        res.json("{status :signup failure error}");
      };
      return res.json("{status : signup success}");
    });

    // self.save(function (err, doc) {
    //     if (err || !doc) return next(err);
    //     self = doc;
    // });
  });
});

//parameter: studentid
//returns a json with individual student info
app.post('/getstudent', function (req, res) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
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
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
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


app.post('/deleteAllGrades', function(req, res){
  console.log('inside deleteAllGrades');
  var collection = db.collection('student_details');
  collection.find().toArray(function (err, result) {
    if (err) {
      console.log('error in getallstudents');
      res.status(500).json("{status : error}");
    }
    else {
      for(var i=0;i<result.length;i++) {
        console.log(result[i]["Grade"]);
        collection.updateOne(
          { 'ID': result[i]["ID"] },
          { $set: { "Grade": "No Grade" } },
          function (err, results) {
            if (err) {
              console.log('error at savestudentgrade update');
              res.json("{status : failure}");
            }
            console.log('success');
            res.json("{status : success}");
          });
        }
      }

    });
  });


  //params: student id and grade
  app.post('/savestudentgrade', function (req, res) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
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
      // res.header('Access-Control-Allow-Origin', '*');
      // res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      console.log('inside getgreensheet');
      coursename = req.params.coursename;
      if (coursename == 'cmpe285') {
        res.sendFile("./cmpe285.html", { root: __dirname });
      }
      else if (coursename == 'cmpe235') {
        res.sendFile("./cmpe235.html", { root: __dirname });
      }
    });

    app.post('/sendOtp', function(req,res){
      // res.header('Access-Control-Allow-Origin', '*');
      // res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      console.log('inside sendOtp');
      var otp_Code = req.body.otpCode;
      var loggedIn_Uname = req.body.uName;
      console.log('otp_Code: ' + otp_Code);
      console.log('loggedIn_Uname: ' + loggedIn_Uname);

      // res.status(200).json("{status : success}");

      var collection = db.collection('teacher_credentials');

      collection.findOne({ username: loggedIn_Uname}, function (err, user) {
        authy.verify(user.authyId, otp_Code, function(err, response) {
          if(!err) {
            console.log('response from otp: ' + JSON.stringify(response));
            res.status(200).json("{status : success}");
          }
          else {
            res.status(401).json("{status : error}");
          }
        });
      });

      // collection.updateOne(
      //     { 'ID': studentId },
      //     { $set: { "Grade": studentgrade } },
      //     function (err, results) {
      //         if (err) {
      //             console.log('error at savestudentgrade update');
      //             res.json("{status : failure}");
      //         }
      //         console.log('success');
      //         res.json("{status : success}");
      //     });
    });

    app.listen(port, function () {
      console.log('Our app is running on http://localhost:' + port);
    });
    console.log('Server Started on 8235');
