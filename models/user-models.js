import mongoose, {Schema} from "mongosse";

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
    type: String,
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

export const User = mongoose.model("User", userSchema)