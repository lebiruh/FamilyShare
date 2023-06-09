import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  },
  content: {
    type: String,
  },
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Comment', commentSchema);
