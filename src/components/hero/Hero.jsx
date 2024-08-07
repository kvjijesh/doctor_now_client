import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, Menu, MenuItem } from '@mui/material';
import axios from '../../Servies/axiosInterceptor'; // Corrected the import path
import { useNavigate } from 'react-router-dom';
import { images } from '../../images/image';

const Hero = () => {
  const [value, setValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const history = useNavigate();

  useEffect(() => {

    axios.get('/all-departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const [departments, setDepartments] = useState([]);

  const filterSuggestions = (inputValue) => {
    const inputValueLC = inputValue.toLowerCase().trim();
    if (inputValueLC === '') {
      return [];
    }

    return departments.filter((department) =>
      department.name.toLowerCase().includes(inputValueLC)
    );
  };


  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setSuggestions(filterSuggestions(inputValue));
    setAnchorEl(event.currentTarget);
  };

  const handleSuggestionClick = (suggestion) => {
    history('/doctors-by-departments', { state: suggestion._id });
    setValue('');
    setAnchorEl(null);
  };

  const openMenu = Boolean(anchorEl);

  return (
    <Box container flexDirection={'column'} margin={'auto'} maxWidth={'120rem'} flexWrap={'wrap'}>
      <Grid
        display={'flex'}
        width={'100%'}
        sx={{}}
        height={40}
        justifyContent={'center'}
        gap={2}
        alignItems={'center'}
      >

        <input
          type='search'
          placeholder="Search doctors by departments"
          value={value}
          onChange={handleInputChange}
          style={{ width: 240,maxWidth:'auto', height:30,padding:3,
          borderRadius: '4px',
          color:'white'}}
        />
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={() => setAnchorEl(null)}
        >
          {suggestions.map((suggestion) => (
            <MenuItem
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      {/* <Grid >
      <img style={{borderRadius:'30px'}} src={images.heroImage} alt="" />
      </Grid> */}
    </Box>
  );
};

export default Hero;
