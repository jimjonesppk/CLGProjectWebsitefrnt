import { Fade, Slide, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Home.css';
import MovieIcon from '@mui/icons-material/Movie';
import axios from 'axios';
import { CircularProgress, Container, Typography, AppBar, Box, Toolbar, IconButton, Menu, MenuItem, CardContent, Card, Grid ,Accordion, AccordionSummary, AccordionDetails,} from '@mui/material';
import { Label, Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BebasNeueRegular from './BebasNeue-Regular.ttf'; // Adjust the path to match the actual location of the font file
import { Link as ScrollLink } from 'react-scroll'; // Import Link from react-scroll
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const TransparentAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(0,0,0,.5)',
  boxShadow: 'none',
}));

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

const StyledInputBase = styled('input')({
  color: 'inherit',
  width: '100%',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '4px',
  background: 'size: contain',
  background: 'rgba(255, 255, 255, 0.15)',
  transition: 'background 0.3s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)',
  },
});

const slideImages = [
  {
    url: 'https://cdn.shopify.com/s/files/1/0607/5056/1539/articles/netflix.jpg?v=1669877376',
    caption: 'Welcome to STREAMSAVY'
  },
  {
    url: 'https://external-preview.redd.it/nXBYTyEKD0b-vKX2DFRKiYkROkMTPBZDEDYmhiLJ_uU.jpg?auto=webp&s=bdf7b68182c0539e8adab480984bbc13477fa7d6',
    caption: 'Welcome to STREAMSAVY'
  },
  {
    url: 'https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg',
    caption: 'Welcome to STREAMSAVY'
  },
  {
    url: 'https://img.helpnetsecurity.com/wp-content/uploads/2020/03/23143409/netflix-collection.jpg',
    caption: 'Welcome to STREAMSAVY'
  },
  {
    url: 'https://cdn-images-1.medium.com/v2/resize:fit:1024/1*5lyavS59mazOFnb55Z6znQ.png',
    caption: 'Welcome to STREAMSAVY'
  },
];
const spanStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '100px',
  padding: '5px 10px',
  borderRadius: '5px',
  fontFamily: 'Bebas Neue, sans-serif',
  fontWeight: 'bold', // Make the text bold
  textShadow: '0 0 10px rgba(255, 0, 0, 0.3), 0 0 20px rgba(255, 0, 0, 0.3), 0 0 30px rgba(255, 0, 0, 0.3)', // Adjust opacity
  backgroundImage: 'linear-gradient(to right, #ff0000, #ff5f6d)', // Add red gradient background
  WebkitBackgroundClip: 'text', // Clip text to the background area
  WebkitTextFillColor: 'transparent', // Make text transparent to reveal background gradient
  WebkitTextStroke: '1px black', // Thinner black borders
};


const divStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', // Ensure the container covers the entire viewport height
  background: `
    url('https://wallpapercave.com/wp/nTwzv3B.jpg')`, // Your background image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: 'white',
  fontFamily: 'Comic Sans MS',
  backgroundAttachment: 'fixed', // Keep the background image fixed while scrolling
};

const gridContainerStyle = {
  paddingTop: '50px', // Adjust as needed
  paddingBottom: '50px', // Adjust as needed
};

const gridItemStyle = {
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7))', // Adjust the darkness as needed
  color: 'white',
  borderRadius: '10px', // Rounded corners
  textAlign: 'center',
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    axios.get("http://localhost:3005/view")
      .then(response => {
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movie data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

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
    <div>
      <div className="each-slide">
        <Zoom duration={3000} delay={100}>
          {slideImages.map((image, index) => (
            <div key={index} className="each-slide">
              <div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
                <span style={spanStyle}>{image.caption}</span>
                <TransparentAppBar position="absolute" >
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'white' }}
                    >
                      STREAMSAVY
                    </Typography>
                    <Button component={Link} to="/main" style={{ color: 'white' }}>
                      <MovieIcon />
                      Movies
                    </Button>
                    <Button component={Link} to="/Sign" style={{ color: 'white' }}>
                      <AccountCircleIcon />
                      Login/Register
                    </Button>
                  </Toolbar>
                </TransparentAppBar>
              </div>
            </div>
          ))}
        </Zoom>
      </div>
      <Container style={gridContainerStyle}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} style={gridItemStyle}>
            <ScrollLink to="grid1" smooth={true} duration={500}>
              <Card id="grid1">
                <CardContent>
                  <Typography variant="h5" component="h2">
                  Discover More
                  </Typography>
                  <Typography color="textSecondary">
                  Discover vast collections of movies, series, and documentaries for endless entertainment options.                  </Typography>
                </CardContent>
              </Card>
            </ScrollLink>
          </Grid>
          <Grid item xs={12} sm={4} style={gridItemStyle}>
            <ScrollLink to="grid2" smooth={true} duration={500}>
              <Card id="grid2">
                <CardContent>
                  <Typography variant="h5" component="h2">
                  Anywhere Access
                  </Typography>
                  <Typography color="textSecondary">
                  Stream high-quality content anytime, anywhere, with a user-friendly interface for seamless browsing and viewing.                  </Typography>
                </CardContent>
              </Card>
            </ScrollLink>
          </Grid>
          <Grid item xs={12} sm={4} style={gridItemStyle}>
            <ScrollLink to="grid3" smooth={true} duration={500}>
              <Card id="grid3">
                <CardContent>
                  <Typography variant="h5" component="h2">
                   Customized Viewing
                  </Typography>
                  <Typography color="textSecondary">
                  Enjoy exclusive features like personalized recommendations, offline downloads, and synchronized multi-device streaming.
                  </Typography>
                </CardContent>
              </Card>
            </ScrollLink>
          </Grid>
        </Grid>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', }}>
      <div style={{ width: '90%', maxWidth: 600 }}>FAQ
        
        <Accordion 
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Question 1: What is STREAMSAVY?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              STREAMSAVY is a platform for streaming movies, series, and documentaries with vast collections for endless entertainment options.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Question 2: How can I access content on STREAMSAVY?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can access high-quality content anytime, anywhere, with a user-friendly interface for seamless browsing and viewing.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Question 3: Can I download content for offline viewing?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, STREAMSAVY allows you to download content for offline viewing, providing flexibility and convenience.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
          sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Question 4: Are there personalized recommendations available?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              STREAMSAVY offers personalized recommendations based on your viewing history and preferences to enhance your experience.
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* Add more Accordion components for additional questions */}
      </div>
    </div>
    </div>
  );
};

export default Homepage;


