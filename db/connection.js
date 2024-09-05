import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, {
      useUnifiedTopology : true,
      useNewUrlParser : true
  })
    console.log("connected to DB successfully")
  } catch (error) {
    console.log('failed to connect' , error)
  }
}