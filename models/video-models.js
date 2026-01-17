import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  videoFile: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  ifPublished:{
    type: Boolean,
    default: true
  }

}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)
// helps in loading data as we go not in chunks

export const Video = mongoose.model("Video", videoSchema)