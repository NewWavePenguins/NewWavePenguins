var express = require('express');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var handler = require('./request-handler');


var db = require('./db/config');
var User = require('./db/models/User');
var Goal = require('./db/models/Goal');
var Task = require('./db/models/Task');

// server
var app = express();
app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());
// middleware
//app.use();

//routes
app.get('/', handler.getHandler);
app.get('/getGoals/:userId', handler.getGoals);
app.post('/addTask', handler.addTask);
app.post('/addGoal', handler.addGoal);
app.put('/toggleTask', handler.toggleTask);
app.put('/makeTaskComplete', handler.makeTaskComplete);
app.put('/makeGoalComplete', handler.makeGoalComplete);
app.get('/getTasksOfGoal/:goalId', handler.getTasksOfGoal);
app.get('/getTasksOfTask/:parentId', handler.getTasksOfTask);



// listen
app.set('port', 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port') );
});
