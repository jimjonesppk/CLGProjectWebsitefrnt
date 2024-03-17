import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddGenre = () => {
  const [genreName, setGenreName] = useState('');

  const handleGenreNameChange = (event) => {
    setGenreName(event.target.value);
  };

  const handleAddGenre = async () => {
    try {
      const response = await fetch('http://localhost:3005/genres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: genreName }),
      });
      const data = await response.json();
      console.log('Genre added:', data);
      setGenreName('');
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Genre Name"
        variant="outlined"
        value={genreName}
        onChange={handleGenreNameChange}
      />
      <Button onClick={handleAddGenre} variant="contained">
        Add Genre
      </Button>
    </div>
  );
};

export default AddGenre;
