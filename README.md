# Project codename: NewWavePenguins

'GoalTree' is a productivity web app that allows a user to keep track of and acheive goals in an efficient way by being able to visualize a goal as a tree with the root being the goal and the branches being tasks that need to be achieved to complete the goal.

## Team

  - __Product Owner__: Afsoon
  - __Scrum Master__: Kyle
  - __Development Team Members__: Ana, Tim

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

##  1. Usage

Navigate to signup to create a new user.  To add a new goal type in desired goal in text box and click 'Add'.  To select the goal that you just created click on it under 'My Goals'.  To add a task to that goal type in desired test name and click 'add' button.  To expand and collapse tasks double click on thier relative parent node in the tree. To mark selected task as completed, click on checkbox titled complete selected task.  To remove a task click the 'Remove Task' button.

## 2. Requirements

- Node 4.4.7+
- MongoDB 3.2.8+

## 3. Development

#i) Installing dependencies
From within the root directory:
```sh
npm install
```

#ii) Tasks
- Ensure that requirements and dependencies are installed
- Ensure that MongoDB is running locally my typing ```mongod``` in terminal
- Navigate to /server directory of cloned repo.
- Type ```nodemon server-config.js```
- To run app locally open a browser and go to http://localhost:3000/


