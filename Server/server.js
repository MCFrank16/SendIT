// server.js
//import Parcel from './src/controllers/Courier';
//import express from 'express';

import express from ('express');
import Parcel from ('./src/controllers/Courier');
//import cool from ('cool-ascii-faces')

const app = express()

app.use(express.json())


app.post('/api/v1/Parcels', Parcel.create);
app.get('/api/v1/Parcels', Parcel.getAll);
app.get('/api/v1/Parcels/:id', Parcel.getOne);
app.put('/api/v1/Parcels/:id', Parcel.update);
app.delete('/api/v1/Parcels/:id', Parcel.delete);
app.get('/api/v1/Users/:UserID', Parcel.getUser);

app.listen(9000)
console.log('app running on port ', 9000);

module.exports = app;