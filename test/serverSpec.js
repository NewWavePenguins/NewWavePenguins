var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../server/server-config.js');
var User = require('../server/db/models/User');
var Goal = require('../server/db/models/Goal');
var Task = require('../server/db/models/Task');
chai.use(chaiHttp);
mongoose.connect('mongodb://localhost/greenfieldTest');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});



User.collection.drop();
Goal.collection.drop();
Task.collection.drop();

  beforeEach(function(done){
    var newUser = new User({
      // _id: '1',
      local: {
        email: 'test@test.com',
        password: 'password',
      },
      firstName:   'test',
      lastName:   'testingston',
      goals: []
    });
    newUser.save();
    var newGoal = new Goal({
      // _id: '1',
      completed: false,
      title: 'test 1 2',
      userId: '1',
      tasks: []
    });
    newGoal.save();
    var newTask = new Task({
      // _id: '1',
      completed:   false,
      title:   'create task for goal',
      parentId: '1',
      tasks: []
    });
    newTask.save(function(err) {
      done();
  });
  })
  afterEach(function(done){
    User.collection.drop();
    Goal.collection.drop();
    Task.collection.drop();
    done();
  });

  describe('Goals', function() {
    it('should GET goals from DB', function(done) {
      request('http://127.0.0.1:3000/getGoals/1', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.body)).to.eql([])
        done()
      })
    })
    it('should create a new Goal', function (done) {
      var g = {
        completed: false,
        title: 'create tests for greenfield',
        userId: '1',
        tasks: [],
      };
      Goal.create(g, function (err, createdGoal) {
        should.not.exist(err);
        createdGoal.completed.should.equal(false);
        createdGoal.title.should.equal('create tests for greenfield');
        done();
      });
    });
    xit('should make a req to add new goal', function(done) {
      request(app)
        .post('/addGoal')
        // .set('content-type', 'application/json')
        .send({title: 'create mo tests', userId: '1'})
        .expect(200)
        .end(function(error, res, body) {
          if (error) {
            done(error);
          } else {
            // Goal.findOne({goalId: '2'}).title.should.equal('create mo tests');
            // Goal.findOne({goalId: '2'}).completed.should.equal(false);
            done();
          }
        });
    })
    xit('should mark a goal complete', function(done) {
      request('http://127.0.0.1:3000/makeGoalComplete/1', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
      })
      request('http://127.0.0.1:3000/getGoals/58126cb54cdec58b1e35eeb0', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(body.completed).to.eql(true);
        done()
      })
    })
  })

  xdescribe('Tasks', function() {
    it('should get tasks of goals', function(done) {
      request('http://127.0.0.1:3000/getTasksOfGoal/1', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql(['create task tests'])
        done()
      })
    })
    it('should get an empty task for a goal with no tasks', function(done) {
      request('http://127.0.0.1:3000/getTasksOfGoal/3', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql([]);
        done()
      })
    })
    it('should get tasks of tasks', function(done) {
      request('http://127.0.0.1:3000/getTasksOfTask/1', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql(['task for task']);
        done()
      })
    })
    it('should get empty task if no task', function(done) {
      request('http://127.0.0.1:3000/getTasksOfGoal/2', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql([]);
        done()
      })
    })
  })
