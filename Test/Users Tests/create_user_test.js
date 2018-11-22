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

describe('POST /api/v1/users', () => {
  it('it should create user account', (done) => {
    const data = {
      firstName: 'Alan',
      lastName: 'Kamanzi',
      email: 'Kamanzi@gmail.com',
      password: '88888888',
      userName: 'AlanKamanzi',
    };
    request(server)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.Users.should.have.property('id');
        res.body.Users.should.have.property('firstName').eql('Alan');
        res.body.Users.should.have.property('lastName').eql('Kamanzi');
        res.body.Users.should.have.property('email').eql('Kamanzi@gmail.com');
        res.body.Users.should.have.property('password').eql('88888888');
        res.body.Users.should.have.property('createdDate');
        res.body.Users.should.have.property('userName').eql('AlanKamanzi');
        res.body.should.have.property('message').eql('User created');
        done();
      });
  });

  it('it should not create user account', (done) => {
    const data = {
      firstName: 'Kamanzi',
      lastName: 'Alan',
      email: 'Kamanzi@gmail.com',
    };
    request(server)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('All fields are required');
        done();
      });
  });
});
