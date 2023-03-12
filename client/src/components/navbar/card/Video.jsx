import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideos } from '../../../features/streamVideo/videoSlice';
import VideoCard from './videoCard';
import "./Card.css";
const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state?.videos?.videos?.video);
  console.log('videos', videos)
  const videosStatus = useSelector((state) => state?.videos?.status);
   console.log('videosStatus', videosStatus)
  useEffect(() => {
    if (videosStatus === 'idle') {
      dispatch(fetchVideos());
    }
  }, [videosStatus, dispatch]);

  return (
    <div className='video'>
      {videos.map((video) => (
        <VideoCard key={video?._id} video={video} />
      ))}
    
    </div>
  );
};

export default VideoList;
