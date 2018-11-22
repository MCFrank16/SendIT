import {
  should, expect, use, request,
} from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

process.env.NODE_ENV = 'test';

should();

use(require('chai-uuid'));

use(chaiHttp);

describe('GET /api/v1/parcels/:id', () => {
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
      .get(`/api/v1/parcels/${idd}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Parcel Not found');
        done();
      });
  });

  it('should return a parcel based on its ID', (done) => {
    request(server)
      .get(`/api/v1/parcels/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(id).to.be.a.uuid('v4');
        done();
      });
  });
});
