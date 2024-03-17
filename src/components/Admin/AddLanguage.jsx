import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddLanguage = () => {
  const [languageName, setLanguageName] = useState('');

  const handleLanguageNameChange = (event) => {
    setLanguageName(event.target.value);
  };

  const handleAddLanguage = async () => {
    try {
      const response = await fetch('http://localhost:3005/languages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: languageName }),
      });
      const data = await response.json();
      console.log('Language added:', data);
      setLanguageName('');
    } catch (error) {
      console.error('Error adding language:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Language Name"
        variant="outlined"
        value={languageName}
        onChange={handleLanguageNameChange}
      />
      <Button onClick={handleAddLanguage} variant="contained">
        Add Language
      </Button>
    </div>
  );
};

export default AddLanguage;
