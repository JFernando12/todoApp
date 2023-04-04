import { JWT_KEY, MONGO_URI, PORT } from './env';
import { app } from './app';
import mongoose from 'mongoose';
import { User } from './models/user';
import { dataUsers } from '../data_example';

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

if (!JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

mongoose.connect(MONGO_URI, { authMechanism: 'DEFAULT' }).then(async (db) => {
  console.log('database connected:', db.connections[0].name);
  // await User.insertMany(dataUsers);
  dataUsers.forEach(async (data) => {
    const user = User.build(data);
    await user.save();
  });
  app.listen(PORT || 3001, () => {
    console.log('Server on port: ', PORT || 3001);
  });
});
