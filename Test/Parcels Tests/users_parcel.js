// set the env variable to test during the test
import {
  should, expect, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';
// const uuid = require('uuid');


should();

use(require('chai-uuid'));

use(chaiHttp);

describe('GET /api/v1/users/:UserID/parcels', () => {
  it.skip('should return a message of no User found', (done) => {
    request(server)
      .get('/api/v1/users/1/parcels')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
  });

  it('should return a user based on UserID', (done) => {
    request(server)
      .get('/api/v1/users/4/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
