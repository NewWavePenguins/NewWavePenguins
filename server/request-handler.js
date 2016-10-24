//dependencies
var db = require('./db/config')
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');



//test
exports.getHandler = function(req, res) {
  User.find(function(err, users) {
    if (err) {throw err}
    else {
      res.status(200).send(users);
    }
  })
};

// Fetch goals for a given user
exports.getGoal = function(req, res) {
  var userId = '580e4659df899e077985f83a';
  Goal.find({userId: userId}).exec(function (err, goals){
    if (err) { throw err }
    else {
      res.status(200).send(goals);
    }
  })
};

// Add new user
exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var newUser = new User({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName
  });
  newUser.save(function(err, newUser) {
    if (err) { throw err }
    else {
      res.status(200).send(newUser);
    }
  })
}

// Add a new goal to a given user
exports.addGoal = function(req, res) {
  var title = req.body.title;
  var userId = req.body.userId;
  var newGoal = new Goal({
    title: title,
    userId: userId,
  });
  newGoal.save(function(err, newGoal) {
    if (err) { throw err; }
    else { res.status(200).send(newGoal); }
  })

}


