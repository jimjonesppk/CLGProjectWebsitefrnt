import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './components/Admin/Movies';
import Moviedetails from './components/Admin/Moviedetails';
import Moviedeails2 from './components/Admin/Moviedeails2';
import Movieedit from './components/Admin/Movieedit';
import Login from './components/Log/Login';
import Navbar from './components/Log/Navbar1';
import Xmain from './components/Userside/Xmain';
import MovieDetailsPage from './components/Userside/MovieDetailsPage';
import Signin from './components/Userside/Signin';
import Homepage from './components/Userside/Homepage';
import MovieWebsite from './components/Userside/MovieWebsite';
import AddGenre from './components/Admin/AddGenre';
import AddLanguage from './components/Admin/AddLanguage';
import NextPage from './components/Userside/Nextpage';
import Register1 from './components/Userside/Register1';
import VideoPlayer from './components/Userside/VideoPlayer'; 

function App() {
  return (
    <div className="hg">
      <BrowserRouter>
        <Routes>
          <Route path='/movie' element={<Movies method='post'/>}></Route>
          <Route path='/moviedetails' element={<Moviedetails method='get'/>}></Route>
          <Route path='/movieedit' element={<Movieedit method='post'/>}></Route>
          <Route path='/Sign' element={<Signin method='post'/>}></Route>
          <Route path='/Main' element={<Xmain method='post'/>}></Route>
          <Route path='/mode' element={<Moviedeails2 method='get'/>}></Route>
          <Route path='/Main2' element={<MovieDetailsPage method='post'/>}></Route>
          <Route path='/' element={<Homepage method='post'/>}></Route>
          <Route path="/main/:id" element={<NextPage method='get'/>}></Route> 
          <Route path="/reg" element={<Register1 method='post'/>}></Route>
          <Route path="/video-player/:videoUrl" element={<VideoPlayer />} />
          <Route path="/video-player/:id/:movieName" element={<VideoPlayer />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
