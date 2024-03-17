// import React, { useState } from "react";
// import axios from "axios";
// function VideoUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("video", selectedFile);

//       axios.post("http://localhost:3000/upload", formData).then((response) => {
//         console.log(response);
//       });
//     }
//   };

//   return (
//     <div>
//       <h1>Upload a Video</h1>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default VideoUpload;