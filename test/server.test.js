const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const app = require('../server');

describe('POST /upload', function() {
  it('should respond with 200 for a valid upload', function(done) {
    request(app)
      .post('/upload')
      .attach('xmlfile', Buffer.from('<document><word value="hi"/></document>'), 'test.xml')
      .expect(200, done);
  });

  it('should respond with 400 when no file is provided', function(done) {
    request(app)
      .post('/upload')
      .expect(400)
      .expect('No file uploaded', done);
  });
});
