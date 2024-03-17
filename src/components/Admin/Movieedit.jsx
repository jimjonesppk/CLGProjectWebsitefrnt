import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Movieedit = (props) => {
    var [inputs,setInputs]=useState(props.data)
    const inputHandler=(event)=>{
        const {name,value}=event.target
        setInputs((inputs)=>({...inputs,[name]:value}))
        console.log(inputs)
    }
    const addHandler=()=>{
        if(props.method==='put'){
            axios.put("http://localhost:3005/edit/"+inputs._id,inputs)
            .then(response=>{
              console.log("data"+response.data)
                alert("Record updated")
                window.location.reload(false);
            })
            .catch(err=>console.log(err))
        }
    }
  return (
    <div>
      <TextField name="MovieId" label="MovieID"  value={inputs.MovieId} variant="outlined" onChange={inputHandler}/><br/><br/>
      <TextField  name="MovieName"  label="MovieName"  value={inputs.MovieName} variant="outlined" onChange={inputHandler}/><br/><br/>
      <TextField  name="Description"  label="Description"  value={inputs.Description} variant="outlined" onChange={inputHandler}/><br/><br/>
      <FormControl sx={{m:1,minWidth:120}}>
      <InputLabel name="Genre" id="demo-simple-select-label">Language</InputLabel>            
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
 </FormControl><br/><br/>
      <FormControl sx={{m:1,minWidth:120}}>
      <InputLabel name="Genre" id="demo-simple-select-label">Genre</InputLabel>            
      <Select
    labelId="demo-simple-select-label"
    label="Genre"
    autoWidth={true}
    onChange={inputHandler}
    name="Genre"
   
  >
    <MenuItem value={"Action"}>Action</MenuItem>
    <MenuItem value={"Thriller"}>Thriller</MenuItem>
    <MenuItem value={"Drama"}>Drama</MenuItem>
    <MenuItem value={"Sci-fi"}>Sci-fi</MenuItem>
    <MenuItem value={"Comedy"}>Comedy</MenuItem>
    <MenuItem value={"Horror"}>Horror</MenuItem>
    <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
  </Select>
 </FormControl><br/><br/>
 <Button onClick={addHandler} variant='contained'>Submit</Button>
    </div>
  )
}

export default Movieedit
