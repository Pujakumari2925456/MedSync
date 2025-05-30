const mongoose = require('mongoose');
const colors = require('colors');

const connectDB =async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongodb connected successfully ${mongoose.connection.host}'.bgGreen.white);
  }
  catch(error){
    // console.log('Mongodb  server Isuue ${error}'.bgRed.white);
    console.log(`Mongodb  server Issue ${error}`.bgRed.white);
    // console.log(`MongoDB connected successfully to host: ${mongoose.connection.host}, db: ${mongoose.connection.name}`.bgGreen.white);


  }
};
module.exports=connectDB;