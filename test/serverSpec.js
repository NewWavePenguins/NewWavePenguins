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
    xit('should GET goals', function(done) {
      request.get('/getGoals/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        expect(res.body.title).to.equal('test 1 2')
      })
    })
    xit('should create a new Goal', function (done) {
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
      var testId;
      Goal.findOne({title: 'test 1 2'}).exec(function(err, goal) {
        testId = goal._id
      })
      request.post('/makeGoalComplete/' + testId)
      .expect(200)
      .end(function(err, res) {
        expect(res.completed).to.equal(true);
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
