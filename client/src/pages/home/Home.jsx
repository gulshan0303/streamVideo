import React from 'react'
import VideoList from '../../components/navbar/card/Video';
// import Card from '../../components/navbar/card/videoCard';

import "./Home.css";
const Home = () => {
  return (
    <>
      {/* <Card/> */}
      <div className="home">
      <VideoList/>

      </div>
    </>
  )
}

export default Home