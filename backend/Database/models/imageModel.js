const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
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
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Image', imageSchema);
