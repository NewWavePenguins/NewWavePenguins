var chai = require('chai');
// var chaihttp = require('chai-http');
var expect = chai.expect;
var should = require('should');
var request = require('request');
var mongoose = require('mongoose');
var User = require('../server/db/models/User');
var Goal = require('../server/db/models/Goal');
mongoose.connect('mongodb://localhost/greenfield-test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});



User.collection.drop();

  beforeEach(function(done){
    var newUser = new User({
      _id: "58126cb54cdec58b1e35eeb0",
      local: {
        email: 'test@test.com',
        password: 'password',
      },
      firstName:   'test',
      lastName:   'testingston',
      goals: []
    });
    newUser.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

  describe('get request handle', function () {
    it('should respond to a successful GET request with a status code 200', function (done){
      request('http://127.0.0.1:3000', function(error, response, body) {
        if (!error) {
          expect(response.statusCode).to.equal(200);
        }
      })
      done();
    });
  });

  describe('Goals', function() {
    it('should GET goals from DB', function(done) {
      request('http://127.0.0.1:3000/getGoals/58126cb54cdec58b1e35eeb0', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.eql([])
        done()
      })
    })
    describe('addGoal', function () {
      it('should create a new Goal', function (done) {
        // Create a User object to pass to User.create()
        var g = {
          completed: false,
          title: 'create tests for greenfield',
          userId: '58126cb54cdec58b1e35eeb0',
          tasks: [],
          goalId: '1'
        };
        Goal.create(g, function (err, createdGoal) {
          // Confirm that that an error does not exist
          should.not.exist(err);
          // verify that the returned user is what we expect
          createdGoal.completed.should.equal(false);
          createdGoal.title.should.equal('create tests for greenfield');
          // Call done to tell mocha that we are done with this test
          done();
        });
      });
    });
  })
