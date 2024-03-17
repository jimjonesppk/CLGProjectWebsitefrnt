import axios from 'axios';
import { CircularProgress, Container, Typography, AppBar, Box, Toolbar, IconButton, Menu, MenuItem ,CardContent,Card} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon  } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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


const MovieDetailsPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
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
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
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
  
    const handleImageClick = (movieId) => {
      // Handle the click on the image button, maybe navigate to a different page
      console.log(`Navigating to movie with ID: ${movieId}`);
    };
  
    return (
      <Box style={{ backgroundImage: `url('https://wallpapercave.com/wp/nTwzv3B.jpg')`, backgroundSize: 'cover' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Home</MenuItem>
              {/* <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                <MenuItem component={Link} to="/Register1" onClick={handleClose}>Register</MenuItem> */}
            </Menu>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              CHILLFLIX
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
            <Button component={Link} to="/Sign" onClick={handleClose} style={{ color: 'inherit' }}>
          <AccountCircleIcon />
          Login/Register
        </Button>
        </Toolbar>
        </AppBar>
        <Container className='body'>
        <Typography variant="h3" align="center" gutterBottom style={{ margin: '20px 0', color: 'white' }}>Movies</Typography>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {filteredMovies.map((movie, index) => (
              <Button
                key={index}
                onClick={() => handleImageClick(movie.id)} 
                style={{ textDecoration: 'none', color: 'black' }}
              >
                

                <Card style={{ margin: '20px', width: '300px' , backgroundColor: 'black' }}>
                  <CardContent>
                    {movie.image1 && (
                      <img src={`data:image/jpeg;base64,${Buffer.from(movie.image2.data).toString('base64')}`} style={{ marginBottom: '20px', maxWidth: '100%' }} alt="Movie" />
                    )}
                   <Typography variant="subtitle1" gutterBottom style={{ color: 'white' }}><strong>{movie.MovieName}</strong>
                   </Typography>
                  </CardContent>
                </Card>
              </Button>
            ))}
          </div>
        </Container>
      </Box>
    );
  };

export default MovieDetailsPage