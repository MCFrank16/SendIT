import express from 'express';
import Parcel from './Server/Controllers/Parcel';
import Uzas from './Server/Controllers/Users';

const app = express();

app.use(express.json());
// Parcel routes
app.post('/api/v1/parcels', Parcel.createParcel);
app.get('/api/v1/parcels', Parcel.getAll);
app.get('/api/v1/parcels/:id', Parcel.getOne);
app.put('/api/v1/parcels/:id/cancel', Parcel.updateStatus);
app.get('/api/v1/users/:UserID/parcels', Parcel.findbyUser);
// User routes
app.post('/api/v1/users', Uzas.createUser);
app.get('/api/v1/users', Uzas.getAllUser);
app.get('/api/v1/users/:id', Uzas.getOneUser);
app.put('/api/v1/users/:id/update-user', Uzas.updateUser);

app.listen(9000);
console.log('app running on port ', 9000);

module.exports = app;
