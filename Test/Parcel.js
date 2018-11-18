//set the env variable to test during the test
process.env.NODE_ENV = "test";

const ParcelsModel = require('../src/models/Courier');
const chai = require('chai');
const chaiHttp = require('chai-Http');
const server = require('../Server/server');


const should = chai.should();
chai.use(chaiHttp);

	// now it is time to test the GET all the parcels 

	describe('GET /api/v1/Parcels', () => {
		it('should get all the parcels', (done) => {

			chai.request(server)
			.get('/api/v1/Parcels')
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
		});

	});

	describe('POST /api/v1/parcels', () =>{
      
      it('should not create a new Parcel unless all field is given', (done) => {
         
         chai.request(server)
         .post('/api/v1/parcels')
         .end((err,res) => {
         	res.should.have.status(400);
         	res.body.should.have.property('message').eql('All fields are required');
 
         	done();
         });

      });

      it('should Post a new Parcel', (done) => {
      
         chai.request(server)
         .post('/api/v1/parcels')
      
         .end((err,res) => { 
           
           res.should.have.status(201);
           res.body.should.be.a('array');
           done();


         });

      });

	});



