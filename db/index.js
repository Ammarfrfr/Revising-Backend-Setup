import { DB_NAME } from "../constants.js"
import mongoose from "mongoose";

const mongoDBConnect = async function (){
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connecting on server is on ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error(`MogogDB was able to connct  on server ${process.env.PORT}`, error)
    process.exit(1);
  }
}

export default mongoDBConnect;