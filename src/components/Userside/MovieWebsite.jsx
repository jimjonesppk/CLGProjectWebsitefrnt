import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Typography, AppBar, Box, Toolbar, IconButton, Menu, MenuItem ,CardContent,Card} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon  } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';



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
      // vertical padding + font size from searchIcon
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


const SingleMoviePage = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { MovieId } = useParams();


  useEffect(() => {
    axios.get(`http://localhost:3005/view/${MovieId}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movie data:', err);
        setError("Error fetching movie data. Please try again later.");
        setLoading(false);
      });
  }, [MovieId]);
  

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">Error: {error.message}</Typography>
      </div>
    );
  }

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
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
            />
          </Search>
          <Button component={Link} to="/Sign" style={{ color: 'inherit' }}>
            Login/Register
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h3" align="center" gutterBottom style={{ margin: '20px 0' }}>{movie.MovieName}</Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ maxWidth: '500px', margin: 'auto' }}>
            <CardContent>
              {movie.image1 && (
                <img src={`data:image/jpeg;base64,${Buffer.from(movie.image1.data).toString('base64')}`} style={{ marginBottom: '20px', maxWidth: '100%' }} alt="Movie" />
              )}
              <Typography variant="h5" gutterBottom><strong>Release Year:</strong> {movie.ReleaseYear}</Typography>
              <Typography variant="h5" gutterBottom><strong>Genre:</strong> {movie.Genre}</Typography>
              <Typography variant="h5" gutterBottom><strong>Director:</strong> {movie.Director}</Typography>
              <Typography variant="h5" gutterBottom><strong>Cast:</strong> {movie.Cast}</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Watch Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Box>
  );
};

export default SingleMoviePage;
