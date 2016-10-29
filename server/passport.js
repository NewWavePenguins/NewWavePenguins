var LocalStrategy = require('passport-local').Strategy;
var User = require('./db/models/User');

module.exports = function(passport) {
  // passport session setup

  // serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

    // Local signup

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', passwordField: 'password', passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function(req, email, password, done) {
        // asynchronous
      process.nextTick(function() {
        User.findOne({
          'local.email': email
        }, function(err, user) {
          if (err)
            return done(err);
              if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              } else {
                var newUser = new User();
                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.goals = [];
                // save the user
                newUser.save(function(err, newUser) {
                  if (err) throw err;
                  req.session.userId = newUser._id;
                  return done(null, newUser);
                });
              }
          });
      });
  }));

   //local login set up
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err)
          return done(err);

      if (!user)
          return done(null, false, req.flash('loginMessage', 'No user found.'));

      if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      req.session.userId = user._id;
      // console.log('req.body.email', req.body.email);
      return done(null, user);
    });
  }));
};
