const {Video,Comment} = require('../model/streamModel');
const User = require('../model/authmodel');


// create a new video
exports.createVideo = async(req, res,next) => {
   const user = await User.find({});
  const video = new Video({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    uploader_id: req.user?.user.id
  });
 

  video.save().then(() => {
    res.json({ success: true, message: 'Video saved successfully' , video});
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error saving video', error: err });
  });
};

// get all videos
exports.getAllVideos = (req, res) => {
  Video.find().populate('uploader_id').populate('comments').then((videos) => {
    res.json({ success: true, videos: videos });
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error retrieving videos', error: err });
  });
};

// get a single video by id
exports.getVideoById = (req, res) => {
  Video.findById(req.params.id).populate('uploader_id').populate('comments').then((video) => {
    if (!video) {
      res.status(404).json({ success: false, message: 'Video not found' });
    } else {
      res.json({ success: true, video: video });
    }
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error retrieving video', error: err });
  });
};

// create a new comment on a video
exports.createComment = (req, res) => {
  const comment = new Comment({
    video_id: req.params.id,
    commenter_id: req.user._id,
    comment_text: req.body.comment_text
  });

  comment.save().then(() => {
    Video.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } }).then(() => {
      res.json({ success: true, message: 'Comment saved successfully' });
    }).catch((err) => {
      res.status(500).json({ success: false, message: 'Error updating video', error: err });
    });
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error saving comment', error: err });
  });
};

// like a video
exports.likeVideo = (req, res) => {
  Video.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }).then(() => {
    res.json({ success: true, message: 'Video liked successfully' });
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error liking video', error: err });
  });
};

// share a video
exports.shareVideo = (req, res) => {
  const share = {
    shared_by: req.user._id,
    shared_to: req.body.shared_to,
    shared_at: Date.now()
  };

  Video.findByIdAndUpdate(req.params.id, { $push: { shares: share } }).then(() => {
    res.json({ success: true, message: 'Video shared successfully' });
  }).catch((err) => {
    res.status(500).json({ success: false, message: 'Error sharing video', error: err });
  });
};
