const mongoose = require('mongoose');
const User = require("./authmodel")
// define the Videos schema
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnail:String,
  url: String,
  comments: [
    {
      videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  uploader_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// define the Users schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now }
// });

// define the Views schema
const viewSchema = new mongoose.Schema({
  video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  viewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

// define the Likes schema
const likeSchema = new mongoose.Schema({
  video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  liker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

// define the Comments schema
const commentSchema = new mongoose.Schema({
  video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  commenter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment_text: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// define the Shares schema
const shareSchema = new mongoose.Schema({
  video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  sharer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now }
});

// create the models
const Video = mongoose.model('Video', videoSchema);
// const User = mongoose.model('User', userSchema);
const View = mongoose.model('View', viewSchema);
const Like = mongoose.model('Like', likeSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Share = mongoose.model('Share', shareSchema);

module.exports = {Video,View,Like,Comment,Share}
