import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const Root = styled('div')`
  background-image: url('https://images.unsplash.com/photo-1638184984605-af1f05249a56?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const VideoContainer = styled('div')`
  width: 100%;
  max-width: 1500px;
  margin: auto;
  position: relative;
  top: -50px;
`;

const BlackToolbar = styled(Toolbar)`
  background-color: black;
`;

const VideoPlayer = () => {
  const { videoUrl,  } = useParams();

  return (
    <div>
      <BlackToolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          component={Link} className='sy' to="/"
          style={{ color: 'white' }} // Set text color to white
        >
          STREAMSAVY
        </Typography>
      </BlackToolbar>
      <Root>
        <VideoContainer>
          <video controls style={{ width: '100%', height: '100%' }}>
            <source src={`/videos/${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Typography variant="h4" sx={{ marginTop: '20px', color: '#ffffff' }}>
           
          </Typography>
        </VideoContainer>
      </Root>
    </div>
  );
};

export default VideoPlayer;
