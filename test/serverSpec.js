var chai = require('chai');
// var chaihttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
var request = require('request');
var mongoose = require('mongoose');
var User = require('../server/db/models/User');

mongoose.connect('mongodb://localhost/greenfield-test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});



// db.collection.drop();

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
  })

  // describe('Blobs', function() {
  //   it('should list ALL blobs on /blobs GET');
  //   it('should list a SINGLE blob on /blob/<id> GET');
  //   it('should add a SINGLE blob on /blobs POST');
  //   it('should update a SINGLE blob on /blob/<id> PUT');
  //   it('should delete a SINGLE blob on /blob/<id> DELETE');
  // });
