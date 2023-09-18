import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import axios from '../Servies/axiosInterceptor';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const TopSpeciality = () => {
  const [dept, setDept] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/all-departments');
        setDept(res.data)

      } catch (error) {
        console.log(error)
      }
    })();
  }, []);
  const handleDepartmentselection = (id) => {
    navigate('/doctors-by-departments', { state: id })
  }

  return (
    <>
      <Box>
        <Grid container flexDirection={'column'} >
          <Grid>
            <Typography variant='h4' textAlign={'center'}>Top specialities</Typography>
          </Grid>
          <Grid display={'flex'} justifyContent={'space-around'} flexWrap={'wrap'} mt={2} mb={2} >
            {/* <Carousel width={'100%'} showArrows  > */}
              {dept && dept.map((item, i) => {

                return (

                  <Grid display={'flex'} flexDirection={'column'} key={i} sx={{ width: 350, height: 250 }}>
                    <Grid display={'flex'} justifyContent={'center'} mt={2}>
                      <img style={{ width: 100, height: 100, borderRadius: '50%' }} src={item.image} alt="" />
                    </Grid>
                    <Typography variant='h4' textAlign={'center'} mt={3}>
                      {item.name}
                    </Typography>
                    <Button onClick={() => handleDepartmentselection(item._id)} sx={{ mt: 2 }}>consult now</Button>

                  </Grid>

                )

              })}
            {/* </Carousel> */}

          </Grid>

        </Grid>
      </Box>
    </>
  )
}

export default TopSpeciality