import { DB_NAME } from "../../constants.js"

const mongoDBConnect = async function (){
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connecting on server is on ${connectionInstance.connection.host}`)
  } catch (error) {
    console.error(`MogogDB was able to connct  on server ${process.env.PORT}`)
  }
}

export default mongoDBConnect;