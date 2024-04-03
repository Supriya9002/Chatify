import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatter', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Db is connected');
  } catch (err) {
    console.log('Fail to connect with database', err);
  }
};
