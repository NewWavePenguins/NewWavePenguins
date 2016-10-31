var mongoose = require('mongoose');
var mongooseConection = process.env.MONGODB_URI || 'mongodb://localhost/greenfield'
mongoose.connect(mongooseConection);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});

module.exports = db;
