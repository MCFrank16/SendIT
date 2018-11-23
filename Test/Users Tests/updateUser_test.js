// set the env variable to test during the test
import {
  should, expect, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';


process.env.NODE_ENV = 'test';

should();

use(require('chai-uuid'));

use(chaiHttp);

describe('Test Update Users', () => {
  let id;
  beforeEach((done) => {
    request(server)
      .post('/api/v1/users')
      .send({
        firstName: 'Frankk',
        lastName: 'Mutabazi',
        email: 'Musanze',
        password: 'In transit',
        userName: 'Kigali',
      })
      .end((error, res) => {
        // eslint-disable-next-line prefer-destructuring
        id = res.body.Update.id;
        console.log(res.body);
        done();
      });
  });
  it.only('it should update user profile', (done) => {
    request(server)
      .put(`/api/v1/users/${id}/update-user`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(id).to.be.a.uuid('v4');
        res.body.should.have.property('message').eql('Records Found');
        res.body.Parcel.should.have.property('firstName').eql('Frankk');
        res.body.Parcel.should.have.property('lastName').eql('Mutabazi');
        res.body.Parcel.should.have.property('email').eql('Musanze');
        res.body.Parcel.should.have.property('password').eql('In transit');
        res.body.Parcel.should.have.property('userName').eql('Kigali');
        done();
        done();
      });
  });
  it.only('it should not update user profile', (done) => {
    const idi = '134';
    request(server)
      .put(`/api/v1/users/${idi}/update-user`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Not update');
        done();
      });
  });
});
