import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import mongoDBConnect from "./db/index.js"
import {app} from "./app.js"




mongoDBConnect()
.then(
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on ${process.env.PORT}`)
  })
)
.catch( (err)=> {
  console.error(`Server wasnt able to connect on ${process.env.PORT}`, err)
})