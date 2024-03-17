import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import './Movies.css'
import axios from "axios";

const Movies = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("video", selectedFile);

      axios.post("http://localhost:3005/upload", formData).then((response) => {
        console.log(response);
      });
      
    }
//     fetch('http://localhost:3005/upload', {
//       method: 'post',
//       body: formData,
//   })
//   .then((response) => response.json())
//   .then((data) => {
//       alert("record is saved")
//   })
//   .catch((err) => {
//       console.log("error")
//   })
// }

  };
  var [inputs, setInputs] = useState({
    "MovieId": '',
    "MovieName": '',
    "Description": '',
    "Language": 'English',
    "Genre": 'Action',
      });
  var [selectedimage, setSelectedimage] = useState(null);
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputs((inputs)=>({...inputs,[name]:value}))
    console.log(inputs)
  };
  // const addHandler = () => {
  //   axios.post("http://localhost:3005/new", inputs)
  //     .then((response) => {
  //       alert("Record saved");
  //       console.log(inputs)
  //     })
  //     .catch((err) => console.log(err));
  // };


 const handleImage=(event) =>{
  const file =event.target.files[0]
  setSelectedimage(file)
  inputs.image1=file;
  // console.log(setSelectedimage);
 }

const saveData = () => {
 const formdata=new FormData();
 console.log(inputs.Genre)
  formdata.append('MovieId', inputs.MovieId);
  formdata.append('MovieName', inputs.MovieName);
  formdata.append('Description', inputs.Description);
  formdata.append('Language', inputs.Language);
  formdata.append('Genre', inputs.Genre);
  formdata.append('image1',selectedimage);
  console.log("Form data:", formdata); // Log formdata before fetch request
  fetch('http://localhost:3005/new', {
      method: 'post',
      body: formdata,
  })
  .then((response) => response.json())
  .then((data) => {
      alert("record is saved")
  })
  .catch((err) => {
      console.log("error")
  })
}

  return (
    <div className='yad'>
      <br /><TextField name="MovieId" label="MovieID" value={inputs.MovieId} variant="outlined" onChange={inputHandler} /><br /><br />
      <TextField name="MovieName" label="MovieName" value={inputs.MovieName} variant="outlined" onChange={inputHandler} /><br /><br />
      <TextField name="Description" label="Description" value={inputs.Description} variant="outlined" onChange={inputHandler} /><br /><br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel name="Language" id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Language"
          autoWidth={true}
          onChange={inputHandler}
          name="Language"

        >
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Malayalam"}>Malayalam</MenuItem>

        </Select>
      </FormControl><br /><br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel name="Genre" id="demo-simple-select-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Genre"
          autoWidth={true}
          onChange={inputHandler}
          name="Genre"
          value={inputs.Genre}
        >
          <MenuItem value={"Action"}>Action</MenuItem>
          <MenuItem value={"Thriller"}>Thriller</MenuItem>
          <MenuItem value={"Drama"}>Drama</MenuItem>
          <MenuItem value={"Sci-fi"}>Sci-fi</MenuItem>
          <MenuItem value={"Comedy"}>Comedy</MenuItem>
          <MenuItem value={"Horror"}>Horror</MenuItem>
          <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
        </Select>
      </FormControl><br /><br />

      <label>choose image to upload</label><br />
      <input type="file" onChange={handleImage} ></input>
      <br /><br />

      <label>Upload a Video</label><br/>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <br /><br />
      <Button onClick={saveData} variant='contained'>Submit</Button>
    </div>
  )
}

export default Movies
