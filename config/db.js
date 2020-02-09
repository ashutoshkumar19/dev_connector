const mongoose = require('mongoose');
const config = require('config');
const mongodb_Atlas = config.get('mongodb_Atlas_URI');
const mLab_db = config.get('mLab_db_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_Atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    //Exit process with failure
    process.exit();
  }
};

module.exports = connectDB;
