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
  let uid;
  beforeEach((done) => {
    request(server)
      .post('/api/v1/parcels')
      .send({
        name: 'Frankk',
        from: 'Mutabazi',
        to: 'Musanze',
        status: 'In transit',
        plocation: 'Kigali',
        userID: 5,
      })
      .end((error, res) => {
        // eslint-disable-next-line prefer-destructuring
        uid = res.body.parcel.userID;
        done();
      });
  });
  it('should return a message of no User found', (done) => {
    const j = Number.parseInt('1', 10);
    request(server)
      .get(`/api/v1/users/${j}/parcels`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
  });

  it('should return a user based on UserID', (done) => {
    request(server)
      .get(`/api/v1/users/${uid}/parcels`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
