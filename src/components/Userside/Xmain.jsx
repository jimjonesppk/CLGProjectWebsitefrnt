import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Button, Card, CardContent } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Buffer } from 'buffer';
import './Xmain.css';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
 
const Xmain = () => {
  const navigate= useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3005/view")
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movie data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.MovieName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMovieClick = (movieId) => {
    // const selected = filteredMovies.find(movie => movie._id === movieId);
    // console.log('Selected Movie:', selected);
    // setSelectedMovie(selected);
    console.log(movieId)
    navigate(`/main/${movieId}`)
  };

  const clearSelectedMovie = () => {
    setSelectedMovie(null);
  };

  console.log('Filtered Movies:', filteredMovies);

  return (
    <Box style={{ backgroundImage: `url('https://wallpapercave.com/wp/nTwzv3B.jpg')`, backgroundSize: 'cover' }}>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            component={Link} className='sy' to="/" onClick={clearSelectedMovie}
          >
            STREAMSAVY
          </Typography>
          <Search align="center">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          <Button component={Link} to="/Sign" style={{ color: 'inherit' }}>
            <AccountCircleIcon />
            Login/Register
          </Button>
        </Toolbar>
      </AppBar>
      <Container className='body'>
        {selectedMovie ? (
          <div>
            <Typography variant="h4" align="center" gutterBottom style={{ margin: '20px 0', color: 'white' }}>{selectedMovie.MovieName}</Typography>
            <Card style={{ margin: '20px', width: '300px', backgroundColor: 'black', color: 'white' }}>
              <CardContent>
                {selectedMovie.image1 && (
                  <img src={`data:image/jpeg;base64,${Buffer.from(selectedMovie.image1.data).toString('base64')}`} style={{ marginBottom: '20px', maxWidth: '100%' }} alt="Movie" />
                )}
                <Typography variant="subtitle1" gutterBottom><strong>Genre:</strong> {selectedMovie.Genre}</Typography>
                <Typography variant="subtitle1" gutterBottom><strong>Language:</strong> {selectedMovie.Language}</Typography>
                <Typography variant="subtitle1" gutterBottom><strong>Description:</strong> {selectedMovie.Description}</Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {filteredMovies.map((movie, index) => (
              <Button
                className='shrink-button'
                key={index}
                onClick={() => handleMovieClick(movie._id)}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <Card style={{ margin: '20px', width: '300px', backgroundColor: 'black' }}>
                  <CardContent>
                    {movie.image1 && (
                      <img src={`data:image/jpeg;base64,${Buffer.from(movie.image1.data).toString('base64')}`} style={{ marginBottom: '20px', maxWidth: '100%' }} alt="Movie" />
                    )}
                    <Typography variant="subtitle1" gutterBottom style={{ color: 'white' }}><strong>{movie.MovieName}</strong></Typography>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Xmain;
