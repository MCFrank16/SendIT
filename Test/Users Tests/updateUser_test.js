// set the env variable to test during the test
import {
  should, expect, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

const userId = 'dc20098c-a5a2-4694-8379-62d41ca03341';

process.env.NODE_ENV = 'test';

should();

use(require('chai-uuid'));

use(chaiHttp);

describe('Test Update Users', () => {
  const data = {
    firstName: 'Castro',
    lastName: 'Brune',
    email: 'Casbrune@gmail.com',
  };
  it('it should update user profile', (done) => {
    request(server)
      .put('/api/v1/users/:id/update-user')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(userId);
        res.body.should.have.property('firstName').eql('Castro');
        res.body.should.have.property('lastName').eql('Brune');
        res.body.should.have.property('email').eql('Casbrune@gmail.com');
        res.body.should.have.property('password').eql('987654321');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('MFrank');
        done();
      });
  });
  it('it should not update user profile', (done) => {
    request(server)
      .put(`/api/v1/users/${userId}/update-user`)
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
});
