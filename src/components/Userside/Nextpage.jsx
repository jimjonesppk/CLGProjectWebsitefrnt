import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Container, TextField, Paper, Rating } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Define BlackToolbar component
const BlackToolbar = styled('div')`
  background-color: black;
  padding: 10px;
`;

const NextPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [feedback, setFeedback] = useState({ name: '', email: '', review: '' }); // Feedback state
  const [rating, setRating] = useState(0); // Rating state

  useEffect(() => {
    console.log('Fetching movie details for ID:', id);
    axios.get(`http://localhost:3005/movies/${id}`)
      .then(response => {
        console.log('Received movie details:', response.data);
        setMovieData(response.data);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  const handleStartClick = async () => {
    try {
      // Construct the video URL based on the movie _id
      const videoUrl = `/${movieData._id}.mp4`;
      navigate(`/video-player${videoUrl}`);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div 

    
      style={{
        display: 'flex',
        justifyContent: 'flex-start', // Align to the far left
        alignItems: 'flex-start', // Align to the top
        backgroundImage: `url('https://images.unsplash.com/photo-1638184984605-af1f05249a56?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 20,
        color: 'white',
      }}
    >  
       {/* BlackToolbar */}
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

      {/* Movie details section */}
      <Container maxWidth="md" style={{ marginRight: 10, marginTop: 200 ,marginLeft: -100 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {movieData.image1 && (
              <img
                src={`data:image/jpeg;base64,${Buffer.from(movieData.image1.data).toString('base64')}`}
                alt="Movie"
                style={{ width: '100%', height: 'auto', marginBottom: 20, borderRadius: 8 }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>{movieData.MovieName}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Genre:</strong> {movieData.Genre}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Language:</strong> {movieData.Language}</Typography>
            <Typography variant="subtitle1" gutterBottom><strong>Description:</strong> {movieData.Description}</Typography>
            <Button
              variant='contained'
              color="secondary"
              size="large"
              onClick={handleStartClick}
              style={{ marginTop: 20 }}
            >
              Watch Now
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Feedback section */}
      <Paper elevation={3} style={{ padding: 10, background: 'black', alignSelf: 'flex-start', marginTop: 300, marginLeft: 500 }}>
        <Typography variant="h5" gutterBottom style={{ color: 'white' }}>Feedback</Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
          margin="normal"
          variant="outlined"
          InputProps={{ style: { color: 'white', borderColor: 'black' } }} // Set border color to white
          style={{ marginBottom: 2, background: '#333', color: 'black' }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
          margin="normal"
          variant="outlined"
          InputProps={{ style: { color: 'white', borderColor: 'black' } }} // Set border color to white
          style={{ marginBottom: 2, background: '#333', color: 'black' }}
        />
        <TextField
          fullWidth
          label="Review"
          name="review"
          value={feedback.review}
          onChange={(e) => setFeedback({ ...feedback, review: e.target.value })}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          InputProps={{ style: { color: 'white', borderColor: 'black' } }} // Set border color to white
          style={{ marginBottom: 10, background: '#333', color: 'black' }}
        />
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          style={{ marginBottom: 10, borderColor: 'white', outline: 'white' }} // Set border color of stars to white
        />
        <Button
          variant='contained'
          color="primary"
          fullWidth
          onClick={() => alert('Feedback submitted')} // Placeholder function
          style={{ background: '#555', color: 'white' }}
        >
          Submit
        </Button>
      </Paper>
      
    </div>
  );
};

export default NextPage;
