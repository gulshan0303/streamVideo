const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createShare,getSharesForVideo } = require("../controller/shareController");
const {
  createVideo,
  getAllVideos,
  getVideoById,
  createComment,
  likeAndUnlikePost,
 
} = require("../controller/streamController");

// middleware to verify JWT
const verifyJWT = (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      } else {
        req.user = decodedToken;
      
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Authorization header not found' });
  }
};

// create a new video
router.post("/videos", verifyJWT, createVideo);

// get all videos
router.get("/videos", getAllVideos);

// get a single video by id
router.get("/videos/:id", getVideoById);

// create a new comment on a video
router.post("/videos/:id/comments", verifyJWT, createComment);

// like a video
router.post("/videos/:id/like", verifyJWT, likeAndUnlikePost);

// Route for creating a new share
router.post('/videos/:videoId/shares', verifyJWT, createShare);
// GET all shares for a video
router.get('/videos/:videoId/all', verifyJWT, getSharesForVideo);

module.exports = router;
