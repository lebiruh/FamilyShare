import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
  },
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Post', postSchema);
