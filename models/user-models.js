import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  fullName: { 
    type: String,
    required: true,
    trim: true,
    index: true // to have ease in search ig
  },
  coverImage: {
    type: String // cloudinary image
  },
  watchHistory:{
    type: Schema.Types.ObjectId,
    ref: "Video"
  },
  refreshToken: {
    type: String
  },  
  avatar: {
    type: String,
    required: true
  }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
    
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      email: this.email,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.refreshAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRY_TOKEN
    }
  )
}


export const User = mongoose.model("User", userSchema)