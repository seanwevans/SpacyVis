import request from 'supertest';
import { expect } from 'chai';
import path from 'path';
import app from '../server.js';

describe('GET /', function() {
  it('should render the upload page', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect(res => {
        expect(res.text).to.match(/Upload and Visualize XML/);
      })
      .end(done);
  });
});

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

  it('should respond with 500 when XML is malformed', function(done) {
    request(app)
      .post('/upload')
      .attach('xmlfile', Buffer.from('<document><word value="hi"></document>'), 'test.xml')
      .expect(500)
      .expect('Unable to parse XML', done);
  });
});
