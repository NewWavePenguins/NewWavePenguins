//dependencies
var db = require('./db/config')
var User = require('./db/models/User');



//test
exports.getHandler = function(req, res) {
  User.find(function(err, users) {
    if (err) {throw err}
    else {
      res.status(200).send(users);
    }
  })
};

exports.postHandler = function(req, res) {
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