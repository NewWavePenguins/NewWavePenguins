var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var request = supertest('http://127.0.0.1:3000')
var express = require('express');
var mongoose = require('mongoose');
var User = require('../server/db/models/User');
var Goal = require('../server/db/models/Goal');
var Task = require('../server/db/models/Task');

mongoose.connect('mongodb://localhost/greenfieldTest');

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
      // _id: '1',
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
      // _id: '1',
      completed: false,
      title: 'test 1 2',
      userId: '1',
      tasks: []
    });
    testGoalId = newGoal._id
    console.log(testGoalId)
    newGoal.save();
    var newTask = new Task({
      // _id: '1',
      completed:   false,
      title:   'create task for goal',
      parentId: testGoalId,
      tasks: []
    });
    testTaskId = newTask._id
    newTask.save(function(err) {
      done();
  });
  })


  describe('Goals', function() {
    xit('should GET goals', function(done) {
      request.get('/getGoals/' + testUserId)
      .expect(200)
      .end(function(err, res) {
        console.log(res.body)
        expect(res.body.title).to.equal('test 1 2')
      })
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
    it('should get tasks of goals', function(done) {
      request.get('/getTasksOfGoal/' + testGoalId)
      .expect(200)
      .end(function(err, task) {
        expect(task.body).to.eql([])
        done()
      })
    })
    xit('should get an empty task for a goal with no tasks', function(done) {
      request('http://127.0.0.1:3000/getTasksOfGoal/3', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql([]);
        done()
      })
    })
    xit('should get tasks of tasks', function(done) {
      request('http://127.0.0.1:3000/getTasksOfTask/1', function(error, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.eql(['task for task']);
        done()
      })
    })
    xit('should toggle taks completed', function(done) {
      request.post('/makeTaskComplete')
      .expect(200)
      .end(function(err, task) {
        console.log(testUserId)
        done()
      })
    })
  })


  after(function(done){
    User.collection.drop();
    Goal.collection.drop();
    Task.collection.drop();
    done();
  });
