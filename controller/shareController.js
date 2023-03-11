const { Share } = require('../model/streamModel');


// controller to create a new share
exports.createShare = async (req, res) => {
    try {
      const { videoId } = req.params;
      const { sharerId } = req.body;
  
      // create a new share document
      const newShare = new Share({
        video_id: videoId,
        sharer_id: sharerId,
      });
     
      // save the new share document to the database
      const savedShare = await newShare.save();
  
      res.status(201).json({ message: 'Share created successfully', share: savedShare });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating share', error });
    }
  };
  
 
  
// // controller to get all shares for a video
 exports.getSharesForVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // find all shares for the given video id
    const shares = await Share.find({ video_id: videoId }).populate('sharer_id');

    res.status(200).json({ shares });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting shares', error });
  }
};
