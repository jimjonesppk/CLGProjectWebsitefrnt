import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movieedit from './Movieedit';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from 'buffer';


const Moviedeails2 = () => {
    const [selected, setSelected] = useState(null); // Initialize selected as null
    const [update, setUpdate] = useState(false);
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3005/view")
            .then(response => {
                setMovie(response.data);
                setLoading(false);
                console.log("AAAAAAAAAAA:",response.data.image)
            })
            .catch(err => {
                console.error('Error fetching movie data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    const updateValues = (row) => {
        setSelected(row);
        setUpdate(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>MovieId</TableCell>
                            <TableCell>MovieName</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Image</TableCell> {/* Added image header */}
                            <TableCell>Edit</TableCell> {/* Changed TableCell text */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movie.map((row, pos) => (
                            <TableRow key={pos}>
                                <TableCell>{row.MovieId}</TableCell>
                                <TableCell>{row.MovieName}</TableCell>
                                <TableCell>{row.Description}</TableCell>
                                <TableCell>{row.Language}</TableCell>
                                <TableCell>{row.Genre}</TableCell>
                                <TableCell><img src={`data:image/jpeg;base64,${Buffer.from(row.image2.data).toString('base64')}`} width="50" height="50" alt="Error" />
                                                                 </TableCell>
                                <TableCell>
                                    <EditIcon onClick={() => updateValues(row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {update && <Movieedit data={selected} method='put' />} {/* Simplified update rendering */}
        </div>
    );
};

export default Moviedeails2
