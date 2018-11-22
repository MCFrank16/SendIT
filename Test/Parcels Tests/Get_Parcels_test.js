
// set the env variable to test during the test
import {
  should, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';
// const uuid = require('uuid');


should();

use(require('chai-uuid'));

use(chaiHttp);

// now it is time to test the GET all the parcels

describe('GET /api/v1/parcels', () => {
  it('should get all the parcels', (done) => {
    request(server)
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('parcel Retrieved Successfully');
        res.body.should.be.a('object');
        done();
      });
  });
});
