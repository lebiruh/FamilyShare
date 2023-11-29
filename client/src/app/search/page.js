'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

export default function Navbar() {
  const [query, setQuery] = useState('');

  const { data: results = [] } = useQuery(['search', query], () =>
    axios.get(`http://localhost:5000/api/search?query=${query}`).then((res) => res.data),
    {
      enabled: !!query,
    }
  );

  const handleInputChange = (event, value) => {
    setQuery(value);
  };

  return (
    // <nav>
      // {/* Other navbar items */}
      <Box sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          options={results.map((option) => option.name)}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField {...params} label="Search users" variant="outlined" />
          )}
        />
      </Box>
    // </nav>
  );
}
