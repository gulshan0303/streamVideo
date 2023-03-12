import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uploadVideo } from '../../features/streamVideo/uploadVideoSlice';
import "./Upload.css"
function UploadVideoPage() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(uploadVideo({ title, description, thumbnail, videoUrl }));
  };

  useEffect(() => {
  uploadVideo()
      // dispatch(uploadVideo());
    
  }, [uploadVideo, dispatch]);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Thumbnail:
        <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
      </label>
      <label>
        Video URL:
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      </label>
      <button type="submit">Upload Video</button>
    </form>
  );
}

export default UploadVideoPage;
