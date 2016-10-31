var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var request = supertest('http://127.0.0.1:3000')
var express = require('..');
var mongoose = require('mongoose');
var User = require('../server/db/models/User');
var Goal = require('../server/db/models/Goal');
var Task = require('../server/db/models/Task');

mongoose.connect('mongodb://localhost/greenfield');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongodb connection open');
});



User.collection.drop();
Goal.collection.drop();
Task.collection.drop();

  before(function(done){
    var newUser = new User({
      local: {
        email: 'test@test.com',
        password: 'password',
      },
      firstName:   'test',
      lastName:   'testingston',
      goals: []
    });
    testUserId = newUser._id
    newUser.save();
    var newGoal = new Goal({
      completed: false,
      title: 'test 1 2',
      userId: testUserId.toString(),
      tasks: []
    });
    testGoalId = newGoal._id
    newGoal.save();
    var newTask = new Task({
      completed:   false,
      title:   'create task for goal',
      parentId: testGoalId.toString(),
      tasks: []
    });
    testTaskId = newTask._id
    newUser.goals.push(newGoal)
    newGoal.tasks.push(testTaskId)
    newTask.save(function(err) {
      done();
  });
  })


  describe('Goals', function() {
    xit('should GET goals', function(done) {
      var newGoal = new Goal({
        completed: false,
        title: 'test 34',
        userId: testUserId.toString(),
        tasks: []
      });
      newGoal.save().then(function(error, data) {
        request.get('/getGoals/' + testUserId)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.equal('test 1 2')
        })
      });

    })
    it('should create a new Goal', function (done) {
      request.post('/home/goals/addGoal/')
      .send({
        title: 'create tests for greenfield',
        userId: '1',
      })
      .end(function(err, res) {
        Goal.findOne({title: 'create tests for greenfield'}).exec(function(err, goal) {
          if (err) { console.log(err); }
          expect(goal.title).to.equal('create tests for greenfield');
        })
        done()
      })
    });
    it('should mark a goal complete', function(done) {
      request.post('/makeGoalComplete/')
      .send({goalId: testGoalId})
      .expect(200)
      .end(function(err, res) {
        Goal.findOne({_id: testGoalId}).exec(function(err, goal) {
          expect(goal.completed).to.equal(true);
        })
        done()
      })

    })
  })

  describe('Tasks', function() {
    xit('should get tasks of goals', function(done) {
      request.get('/getTasksOfGoal/' + testGoalId)
      .expect(200)
      .end(function(err, task) {
        expect(task.body).to.eql([testTaskId.toString()])
        done()
      })
    })
    it('should get an empty task for a goal with no tasks', function(done) {
      request.get('/getTasksOfGoal/3')
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.eql([]);
        done();
      })
    })
    it('should get tasks of tasks', function(done) {
      request.get('/getTasksOfTask/' + testGoalId)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.eql([])
        done()
      })
    })
    it('should toggle task completed', function(done) {
      request.post('/makeTaskComplete')
      .send({taskId: testTaskId})
      .expect(200)
      .end(function(err, res) {
        Task.findOne({_id: testTaskId}).exec(function(err, task) {
          expect(task.completed).to.equal(true);
        })
        done()
      })
    })
  })

  xdescribe('Auth', function() {
    it('should add a user', function(done) {
      request.post('/signup/')
      .expect(200)
      .send({'local.email': 'testothy@test.com', 'local.password': 't35t'})
      .end(function(err, res) {
        User.findOne({email: 'testothy@test.com'}).exec(function(err, user) {
          expect(user)
        })
        done()
      })
    })
    it('should log a user in', function(done) {
      request.post('/login/')
      .send({usernameField: 'testothy@test.com', passwordField: 't35t'})
      .end(function(err, res) {
        request.get('/loggedin/')
        .expect(200)
        .expect(res).to.equal(true);
        done()
      })
    })
  })
