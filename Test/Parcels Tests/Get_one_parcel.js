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

// now it is time to test the GET all the parcels

describe('GET /api/v1/parcels/:id', () => {
  const id = '14820446-dba9-427c-b939-cb1e8259a322';
  it.only('should return a message of no parcel found', (done) => {
    request(server)
      .get(`/api/v1/parcels/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Parcel Not found');
        done();
      });
  });

  it.only('should return a parcel based on its ID', (done) => {
    const idi = '14820446-dba9-427c-b939-cb1e8259a322';
    request(server)
      .get(`/api/v1/parcels/${idi}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('')
        res.body.should.be.a('object');
        expect(id).to.be.a.uuid('v4');
        done();
      });
  });
});
