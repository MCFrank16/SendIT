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
describe('GET /api/v1/users', () => {
  it('it should get a specific user', (done) => {
    request(server)
      .get('/api/v1/users/')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not get all specific user', (done) => {
    const idc = '1';
    request(server)
      .get(`/api/v1/users/${idc}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User Not found');
        done();
      });
  });
});
