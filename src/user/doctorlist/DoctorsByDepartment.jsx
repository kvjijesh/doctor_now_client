import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import axios from '../../Servies/axiosInterceptor';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DoctorsByDepartment = () => {
  const location = useLocation()
  const [options, setOptions] = React.useState('');
  const [doctors, setDoctors] = useState([])
  const data = location.state;
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      await axios.get(`/doctors-by-department/${data}`).then((res) => setDoctors(res.data))
    })()
  }, [])


  const handleChange = (event) => {
    setOptions(event.target.value);
    sortDoctors(event.target.value);
  };
  const sortDoctors = (sortBy) => {

    const sortedDoctors = [...doctors];

    if (sortBy === 'name') {
      sortedDoctors.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'feesLowToHigh') {
      sortedDoctors.sort((a, b) => a.videoChatFee - b.videoChatFee);
    } else if (sortBy === 'feesHighToLow') {
      sortedDoctors.sort((a, b) => b.videoChatFee - a.videoChatFee);
    }

    setDoctors(sortedDoctors);
  };
  const handleBook = async (doctorData) => {
    navigate('/doctor-details', { state: { doctorData: doctorData } })
  }
  return (
    <>
      <Grid container flexDirection={'column'} flexWrap={'wrap'}>
        <Grid display={'flex'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'} height={65} sx={{ background: "#202094" }}>
          <Grid>
            <Typography sx={{ color: 'white', ml: 5 }}>Sort by:</Typography>
          </Grid>
          <Grid sx={{ minWidth: 100, ml: 2 }}>
            <FormControl sx={{ padding: 0, border: 'white' }} fullWidth>
              <InputLabel sx={{ color: "white" }}>Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={options}
                label="Age"
                onChange={handleChange}
                sx={{color:'white'}}
              >
               <MenuItem value="">Select</MenuItem>
               <MenuItem value="name">Name</MenuItem>
                <MenuItem value="feesLowToHigh">Fees: Low-High</MenuItem>
               <MenuItem value="feesHighToLow">Fees: High-Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid>
          <Typography variant='h3' sx={{ ml: 2, mt: 2 }}>Found doctors </Typography>
          {doctors && doctors.map((element) => (
            <><Box display={'flex'} ml={10} height={150} mt={5}>
              <Grid>
                {element.image ? (<img style={{ width: 100, height: 100, borderRadius: '50%' }} src={`http://localhost:8000/images/${element?.image}`} alt='photo' />) : (<img style={{ width: 100, height: 100, borderRadius: '50%' }} src={`https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg`} alt='photo' />)}


              </Grid>
              <Grid display={'flex'} flexDirection={'column'} ml={5}>
                <Typography variant='button' sx={{ fontSize: 16, color: 'blue' }}>{element.name}</Typography>
                <Typography variant='subtitle2' sx={{ fontSize: 14, mt: 2 }}>{element.specialisation.name}</Typography>
                <Typography variant='subtitle2' sx={{ fontSize: 14, mt: 1 }}>{element.city},{element.state}</Typography>
                <Typography variant='subtitle2' sx={{ fontSize: 14, mt: 1 }}>Rs.{element.videoChatFee} Fee</Typography>
              </Grid>
              <Grid display={'flex'} alignItems={'flex-end'}>
                <Button onClick={() => handleBook(element)} variant='contained' color='primary' sx={{ ml: 5, mb: 3 }}>BOOK NOW</Button>
              </Grid>

            </Box><Divider sx={{ ml: 10, width: '90%' }} /></>
          ))}

        </Grid>

      </Grid>
    </>
  )
}

export default DoctorsByDepartment