var chai = require('chai');
// var chaihttp = require('chai-http');
var expect = chai.expect;
var request = require('request');

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
