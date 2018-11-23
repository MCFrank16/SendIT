
import uuid from 'uuid';
import { ParcelData, Parcel } from '../Data/Parcel';
import { UserData, User } from '../Data/Users';


const Deliver = {
  // get all parcles
  getAll(req, res) {
    const all = ParcelData;
    return res.status(200).send({ message: 'parcel Retrieved Successfully', parcels: all });
  },
  // create a parcel
  createParcel(req, res) {
    const {
      name, from, to, status, userID, plocation,
    } = req.body;
    if (!name || !plocation || !from || !to
        || !status
        || !userID) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const newData = new Parcel({
      id: uuid.v4(),
      name: req.body.name,
      from: req.body.from,
      to: req.body.to,
      status: req.body.status,
      plocation: req.body.plocation,
      createdDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      modifiedDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      userID: req.body.userID,

    });

    ParcelData.push(newData);
    return res.status(201).send({ message: 'parcel created', parcel: newData });
  },
  // Fetch a single parcel
  getOne(req, res) {
    const { id } = req.params;
    let parcel = new Parcel();
    parcel = parcel.findOne(id);
    if (!parcel) {
      return res.status(404).send({ message: 'Parcel Not found' });
    }
    return res.status(200).send({ success: true, Parcel: parcel });
  },
  // Cancel a parcel
  updateStatus(req, res) {
    const { id } = req.params;
    let parcel = new Parcel();
    parcel = parcel.updateStatus(id);
    if (!parcel) {
      return res.status(404).send({ message: 'Not found' });
    }
    return res.status(200).send({ message: 'Parcel Cancelled Successfully', Parcel: parcel });
  },
  // get all parcels made by a single user
  findbyUser(req, res) {
    const { userID } = req.params;
    let user = new User();
    user = user.findOneUser(userID);
    if (!user) {
      return res.status(404).send({ message: 'Not User Records' });
    }
    let parcel = new Parcel();
    parcel = parcel.findUser(userID);
    return res.status(200).send({ message: 'Parcel Retrieved Successfully', Parcel: parcel });
  },
};


export default Deliver;
