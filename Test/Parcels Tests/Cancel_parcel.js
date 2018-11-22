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
  let id;
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
        id = res.body.parcel.id;
        done();
      });
  });
  it('should return a message of no parcel found', (done) => {
    const idd = '1';
    request(server)
      .put(`/api/v1/parcels/${idd}/cancel`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Not found');
        done();
      });
  });

  it('should Update a parcel based on its ID', (done) => {
    request(server)
      .put(`/api/v1/parcels/${id}/cancel`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(id).to.be.a.uuid('v4');
        res.body.should.have.property('message').eql('Parcel Cancelled Successfully');
        res.body.Parcel.should.have.property('status').eql('cancelled');
        done();
      });
  });
});
