import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
<<<<<<< HEAD
  console.log('Starting up.asdasdasd..');
=======
  console.log('Starting up................');
>>>>>>> d2a0a8e7a24fb565c9a097882948c22cf856342b
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  if (!process.env.MONGO_URI) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connect to DB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listenning on port 3000!');
  });
};

start();
