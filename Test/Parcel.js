// set the env variable to test during the test
import {
  should, expect, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

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
        res.body.parcels.should.be.a('array');
        res.body.should.have.length(3); 
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});

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


describe('GET /api/v1/parcels/:id', () => {
  it('should return a message of no parcel found', (done) => {
    request(server)
      .get('/api/v1/parcels/:id')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Parcel not found');
        res.body.parcel.should.have.property('origin').eql('kigali');
        res.body.parcel.should.have.property('destination').eql('Gisemyi');
        done();
      });
  });

  it('should return a parcel based on its ID', (done) => {
    request(server)
      .get('/api/v1/parcels/3557a7fb-bc66-4558-ae82-01737d471c6e')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
        done();
      });
  });
});

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

describe('DELETE /api/v1/parcels/:id', () => {
  it('should return a message of no parcel found', (done) => {
    request(server)
      .delete('/api/v1/parcels/:id')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Parcel not found');
        done();
      });
  });

  it('should Delete a parcel based on its ID', (done) => {
    request(server)
      .delete('/api/v1/parcels/3557a7fb-bc66-4558-ae82-01737d471c6e')
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
        done();
      });
  });
});

describe('GET /api/v1/users/:UserID/parcels', () => {
  it.skip('should return a message of no User found', (done) => {
    request(server)
      .get('/api/v1/users/1/parcels')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
  });

  it('should return a user based on UserID', (done) => {
    request(server)
      .get('/api/v1/users/4/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
// User's Tests

describe('All Users Route Tests', () => {

  it('it should create user account', (done) => {
    const data = {
      firstName: 'Alan',
      lastName: 'Kamanzi',
      email: 'Kamanzi@gmail.com',
      password: '88888888',
    };
    request(server)
      .post('/api/v1/users')
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('firstName').eql('Alan');
        res.body.should.have.property('lastName').eql('Kamanzi');
        res.body.should.have.property('email').eql('Kamanzi@gmail.com');
        res.body.should.have.property('password').eql('88888888');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('AlanKamanzi');
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

  // Testing for fetch all users
  it('it should get all users', (done) => {
    request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });

  it('it should get a specific user', (done) => {
    request(server)
      .get('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('firstName').eql('Frank');
        res.body.should.have.property('lastName').eql('Mutabazi');
        res.body.should.have.property('email').eql('Mecfrank16@gmail.com');
        res.body.should.have.property('password').eql('987654321');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('MFrank');
        done();
      });
  });

  it('it should not get all a specific user', (done) => {
    request(server)
      .get('/api/v1/users/dc20098c-a5a2-4694-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });

  // Testing for updating user account
  it('it should update user profile', (done) => {
    request(server)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/update-user')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
        res.body.should.have.property('firstName').eql('Frank');
        res.body.should.have.property('lastName').eql('Mutabazi');
        res.body.should.have.property('email').eql('Mecfrank16@gmail.com');
        res.body.should.have.property('password').eql('987654321');
        res.body.should.have.property('createdDate');
        res.body.should.have.property('userName').eql('MFrank');
        done();
      });
  });
  it('it should update user profile', (done) => {
    const data = {
      firstName: 'Castro',
      lastName: 'Brune',
      email: 'Casbrune@gmail.com',
    };
    request(server)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341/update-user')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('dc20098c-a5a2-4694-8379-62d41ca03341');
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
    const data = {
      firstName: 'Castro',
      lastName: 'Brune',
      email: 'Casbrune@gmail.com',
    };
    request(server)
      .put('/api/v1/users/dc20098c-a5a2-4694-8379-3341/update-user')
      .send(data)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
  // Testing for delete user account
  it('it should delete user account', (done) => {
    request(server)
      .delete('/api/v1/users/dc20098c-a5a2-4694-8379-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user was deleted successfully!!!');
        done();
      });
  });
  it('it should not delete user account', (done) => {
    request(server)
      .delete('/api/v1/users/dc20098c-a5a2-8379-62d41ca03341')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not found');
        done();
      });
  });
});
