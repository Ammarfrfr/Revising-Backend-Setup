import multer from "multer";

// jst copy and paste the multer file or smh

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "./public/temp")
  },
  fileName: function (req, file, cb){
    cb(null, file.orignalName)
  }
})

export const upload = multer({
  storage,
})