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

describe('PUT /api/v1/parcels/:id/cancel', () => {
  it('should return a message of no parcel found', (done) => {
    request(server)
      .put('/api/v1/parcels/:id/cancel')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Parcel not found');
        done();
      });
  });

  it('should Update a parcel based on its ID', (done) => {
    request(server)
      .put('/api/v1/parcels/3557a7fb-bc66-4558-ae82-01737d471c6e/cancel')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
        done();
      });
  });
});
