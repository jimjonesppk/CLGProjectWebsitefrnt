
// import { Button, Typography } from '@mui/material'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import baseUrl from '../Api'

// const New = () => {
  
//     const navigate = useNavigate()


//     const handleClick = (id) => {
//       console.log(id)
//       navigate(`/enroll/${id}`)
  
//     }
  
//     const [viewData, setViewData] = useState({})
//     const {id} = useParams()

//     useEffect(() => {
//         axios.get(`http://localhost:4000/view1/${id}`).then(response => {
//             setViewData(response.data)
//             console.log(response.data)
//         })
//     }, [])
//   return (
//     <div>
//        <Typography variant="subtitle1" gutterBottom><strong>{viewData.MovieName}</strong></Typography>
//         <Typography variant="body2" gutterBottom><strong>Language:</strong> {viewData.Language}</Typography>
//         <Typography variant="body2" gutterBottom><strong>Genre:</strong> {viewData.Genre}</Typography>
                            
//         <Typography variant="body2">{viewData.Description}</Typography>
//         <Button variant='contained'onClick={() => handleClick(viewData._id)} >Start Course</Button>
//     </div>
//   )
// }


// export default New