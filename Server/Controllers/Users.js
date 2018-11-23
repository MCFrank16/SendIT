
import uuid from 'uuid';
import { UserData, User } from '../Data/Users';
import { Parcel } from '../Data/Parcel';


const yuzer = {
  // get all users
  getAllUser(req, res) {
    const all = UserData;
    return res.status(200).send({ message: 'User Retrieved Successfully', Users: all });
  },
  // create a User
  createUser(req, res) {
    const {
      firstName, lastName, email, password, userName,
    } = req.body;
    if (!firstName || !lastName || !email || !password
        || !userName) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const newUser = new User({
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      password,
      userName,
      createdDate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),

    });

    UserData.push(newUser);
    return res.status(201).send({ message: 'User created', Users: newUser });
  },
  // Fetch a single user
  getOneUser(req, res) {
    const { id } = req.params;
    let user = new User();
    user = user.findOneUser(id);
    if (!user) {
      return res.status(404).send({ message: 'User Not found' });
    }
    return res.status(200).send({ message: 'User Found', Users: user });
  },

  updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    let uza = new User();
    console.log(id);
    uza = uza.updateOneUser(id, body);
    if (!uza) {
      return res.status(404).send({ message: 'Not update' });
    }
    return res.status(200).send({ message: 'Records Found', Update: uza });
  },
};
export default yuzer;
