// set the env variable to test during the test
import {
  should, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

should();
use(require('chai-uuid'));

use(chaiHttp);
describe('GET /api/v1/users', () => {
  it('it should get all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User Retrieved Successfully');
        done();
      });
  });
});
