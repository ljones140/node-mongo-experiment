var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lewis is MEAN' , someText: 'hello everyone'});
});

router.get('/helloworld', function(req, res) {
  res.render('helloworld', {title: 'Hello, World!'});
});

/* GET Userlist page */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/*GET New User page */
router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add new User'});
});

/*POST to add user */
router.post('/adduser', function(req, res) {

  //set internal db variable
  var db = req.db;

  //get values from the form
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //set our collection
  var collection = db.get('usercollection');

  //insert into database
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem inserting to the database");
    }
    else {
      res.redirect("userlist");
    }
  });

});

router.get('/tasks', function(req, res, next) {
  // res.render('tasklist', {title: 'task list'})
  var db = req.db;
  var collection = db.get('tagcollection');
  var usercollection = db.get('usercollection');

  // res.render('tasklist', { tasklist: tasks , users: users});

  collection.find({}, {}, function(e,docs){
    res.render('tasklist', {
      "tasklist" : docs
    });
  });
});


router.post('/addtask', function(req, res, next) {

  var db = req.db;

  var taskname = req.body.taskname;
  var tag = req.body.tag;
  var user = req.body.user;

  var collection = db.get('tagcollection');

  collection.insert({
    "taskname" : taskname,
    "tag" : tag,
    "user" : user
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem inserting to the database");
    }
    else {
      res.redirect("tasks");
    }
  });

});

router.post('/edit-task', function(req, res, next) {
  var db = req.db;

  var taskname = req.body.taskname;
  var tag = req.body.tag;
  var id = req.body.taskid;
  var user = req.body.user;

  var collection = db.get('tagcollection');

  collection.update (
    { _id: id },
    { $set:
      {
        "taskname" : taskname,
        "tag" : tag,
        "user" : user
      }
    }, function(err, doc) {
      if (err) {
        res.send("There was a problem inserting to the database");
      }
      else {
        res.redirect("tasks");
    }
  });

});

module.exports = router;
