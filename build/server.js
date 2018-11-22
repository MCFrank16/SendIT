
const express = require('express');

const express2 = interopRequireDefault(express);

const Courier = require('./Server/Controllers/Courier');

const Courier2 = interopRequireDefault(Courier);

const Users = require('./Server/Controllers/Users');

const Users2 = interopRequireDefault( Users);

function interopRequireDefault(obj) { return obj && obj.esModule ? obj : { default: obj }; }

const app = (0, express2.default)();

app.use(express2.default.json());
// Parcel routes
app.post('/api/v1/parcels', Courier2.default.create);
app.get('/api/v1/parcels', Courier2.default.getAll);
app.get('/api/v1/parcels/:id', Courier2.default.getOne);
app.put('/api/v1/parcels/:id/cancel', Courier2.default.update);
app.delete('/api/v1/parcels/:id', Courier2.default.delete);
app.get('/api/v1/users/:UserID/parcels', Courier2.default.getUser);
// User routes
app.post('/api/v1/users', Users2.default.createUser);
app.get('/api/v1/users', Users2.default.getAllUser);
app.get('/api/v1/users/:id', Users2.default.getOneUser);
app.put('/api/v1/users/:id/update-user', Users2.default.updateUser);
app.delete('/api/v1/users/:id', Users2.default.deleteUser);

app.listen(9000);
console.log('app running on port ', 9000);

module.exports = app;
