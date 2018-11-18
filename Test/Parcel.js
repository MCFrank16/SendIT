//set the env variable to test during the test
process.env.NODE_ENV = "test";

import ParcelsModel from '../Server/Data/Courier';
import ParcelsController from '../Server/Controllers/Courier';
import { should as _should, expect as _expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
//const uuid = require('uuid');


const should = _should();
const expect = _expect;

use(require('chai-uuid'));
use(chaiHttp);

	// now it is time to test the GET all the parcels 

	describe('GET /api/v1/Parcels', () => {
		it('should get all the parcels', (done) => {

			request(server)
			.get('/api/v1/Parcels')
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				//res.body.length.should.be.eql(0);
				done();
			});
		});

	});

	describe('POST /api/v1/parcels', () =>{
      
      it('should not create a new Parcel unless all field is given', (done) => {
         
         request(server)
         .post('/api/v1/parcels')
         .end((err,res) => {
         	res.should.have.status(400);
         	res.body.should.have.property('message').eql('All fields are required');
 
         	done();
         });

      });

      it('should create a new parcel', (done) => {

        const body = {"Name":"Iphone", "Model":"99JJh", "From":"Kigali", "To":"Kigali", "NowAt":"Kigali", "Status":"Delivered", "UserID":4}
        
        request(server)
        .post('/api/v1/parcels')
        .send(body)
        .end((err,res) => {
         
         res.should.have.status(201);
         done();
        });

      });


      });

    
    describe('GET /api/v1/parcels/:id', () =>{

    it ('should return a message of no parcel found', (done) => {
      request(server)
      .get('/api/v1/Parcels/:id')
      .end((err, res) => {
       res.should.have.status(404);
          res.body.should.have.property('message').eql('Parcel not found');
          done();
      });

    });

    it('should return a parcel based on its ID', (done) =>{
     
     request(server)
     .get('/api/v1/Parcels/3557a7fb-bc66-4558-ae82-01737d471c6e')
     .end((err,res) => {

      res.should.have.status(200);
      res.body.should.be.a('object');
      expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
      done();

     });
    });
    }); 

    describe('PUT /api/v1/parcels/:id', () =>{

    it ('should return a message of no parcel found', (done) => {
      request(server)
      .put('/api/v1/Parcels/:id')
      .end((err, res) => {
       res.should.have.status(404);
          res.body.should.have.property('message').eql('Parcel not found');
          done();
      });

    });

    it('should Update a parcel based on its ID', (done) =>{
     
     request(server)
     .put('/api/v1/Parcels/3557a7fb-bc66-4558-ae82-01737d471c6e')
     .end((err,res) => {

      res.should.have.status(200);
      res.body.should.be.a('object');
      expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
      done();

     });
    });

  

     }); 

    describe('DELETE /api/v1/parcels/:id', () =>{

    it ('should return a message of no parcel found', (done) => {
      request(server)
      .delete('/api/v1/Parcels/:id')
      .end((err, res) => {
       res.should.have.status(404);
          res.body.should.have.property('message').eql('Parcel not found');
          done();
      });
    });

      it('should Delete a parcel based on its ID', (done) =>{
     
     request(server)
     .delete('/api/v1/Parcels/3557a7fb-bc66-4558-ae82-01737d471c6e')
     .end((err,res) => {

      res.should.have.status(204);
      res.body.should.be.a('object');
      expect('3557a7fb-bc66-4558-ae82-01737d471c6e').to.be.a.uuid('v4');
      done();

     });
    });


    }); 

    describe('GET /api/v1/Users/:UserID', () =>{

    it ('should return a message of no User found', (done) => {
      request(server)
      .get('/api/v1/Users/:UserID')
      .end((err, res) => {
       res.should.have.status(404);
          res.body.should.have.property('message').eql('User not found');
          done();
      });
    });

    it('should return a user based on UserID', (done) => {

     
        request(server)
        .get('/api/v1/Users/4')
        .end((err, res)=> {
          res.should.have.status(200);
          done();
            
        });
    });

    });




