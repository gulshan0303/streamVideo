const { Video, Comment,Like } = require("../model/streamModel");
const User = require("../model/authmodel");

// create a new video
exports.createVideo = async (req, res, next) => {
  try {
    const user = await User.find({});
    const video = new Video({
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      description: req.body.description,
      url: req.body.url,
      uploader_id: req.user?.user.id,
    });
    const savedVideo = await video.save();
    // user.map(async(item)=>{
    //   item.videos.push(savedVideo)
    //   await item.save();
    // })
    res.json({
      success: true,
      message: "Video saved successfully",
      savedVideo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error retrieving video",
        error: error,
      });
  }
};

// get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const video = await Video.find().populate("uploader_id");
    const totalVideos = await Video.countDocuments();
    res
      .status(200)
      .json({ success: true, message: "All video are", totalVideos, video });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const getVideos = await Video.findById(req.params.id).populate(
      "uploader_id"
    );
    const query = { uploader_id: getVideos.uploader_id };
    const totalVideos = await Video.countDocuments(query);
    if (!getVideos) {
      res.status(404).json({ success: false, message: "Video not found" });
    }

    res.json({ success: true, totalVideos, video: getVideos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error retrieving video",
      error: error,
    });
  }
};

// create comment and replay
exports.createComment = async (req, res) => {
  try {
    const { parent_comment_id, comment_text } = req.body;
    const { id: video_id } = req.params;
    const commenter_id = req.user._id;

    if (!comment_text) {
      return res
        .status(400)
        .json({ success: false, message: "Comment text is required" });
    }

    let parentComment = null;
    if (parent_comment_id) {
      parentComment = await Comment.findById(parent_comment_id);
      if (!parentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Parent comment not found" });
      }
    }

    const commentData = {
      video_id,
      commenter_id,
      comment_text,
      parent_comment_id: parentComment ? parentComment._id : null,
    };

    const comment = new Comment(commentData);
    await comment.save();

    if (parentComment) {
      parentComment.replies.push(comment._id);
      await parentComment.save();
    } else {
      await Video.findByIdAndUpdate(video_id, {
        $push: { comments: comment._id },
      });
    }

    res.json({ success: true, message: "Comment saved successfully", comment });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error saving comment", error });
  }
};

// Like a video
exports.likeAndUnlikePost = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    if (video.likedVideos.includes(req.user?.user?.id)) {
      const index = video.likedVideos.indexOf(req.user?.user?.id);

      video.likedVideos.splice(index, 1);

      await video.save();

      return res.status(200).json({
        success: true,
        message: "Video Unliked",
        video
      });
    } else {
      video.likedVideos.push(req.user?.user?.id);

      await video.save();

      return res.status(200).json({
        success: true,
        message: "Video Liked",
        video
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// // share a video
// exports.shareVideo = (req, res) => {
//   const share = {
//     shared_by: req.user?.user?.id,
//     shared_to: req.body.shared_to,
//     shared_at: Date.now(),
//   };

//   Video.findByIdAndUpdate(req.params.id, { $push: { shares: share } })
//     .then(() => {
//       res.json({ success: true, message: "Video shared successfully" });
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ success: false, message: "Error sharing video", error: err });
//     });
// };

