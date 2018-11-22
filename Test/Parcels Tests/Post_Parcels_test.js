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

describe('POST /api/v1/parcels', () => {
  it('should not create a new Parcel unless all field is given', (done) => {
    request(server)
      .post('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('All fields are required');

        done();
      });
  });

  it('should create a new parcel', (done) => {
    const body = {
      Name: 'Iphone',
      Model: '99JJh',
      From: 'Kigali',
      To: 'Kigali',
      NowAt: 'Kigali',
      Status: 'Delivered',
      UserID: 4,
    };

    request(server)
      .post('/api/v1/parcels')
      .send(body)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
