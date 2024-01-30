import { Box, Button, Grid, Typography } from '@mui/material';
import axios from '../Servies/axiosInterceptor';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TopSpeciality = () => {
  const [dept, setDept] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/all-departments');
        setDept(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDepartmentselection = (id) => {
    navigate('/doctors-by-departments', { state: id });
  };

  const itemsPerPage = 3;


  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedDepts = dept.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Box>
        <Grid container flexDirection={'column'} mx={'auto'} maxWidth={'120rem'}>
          <Grid>
            <Typography variant='h4' textAlign={'center'}>
              Top specialities
            </Typography>
          </Grid>
          <Grid display={'flex'} justifyContent={'space-around'} flexWrap={'wrap'} mt={2} mb={2}>
            {displayedDepts.map((item, i) => {
              return (
                <Grid display={'flex'} flexDirection={'column'} key={i} sx={{ width: 350, height: 250 }}>
                  <Grid display={'flex'} justifyContent={'center'} mt={2}>
                    <img style={{ width: 100, height: 100, borderRadius: '50%' }} src={item.image} alt="" />
                  </Grid>
                  <Typography variant='h4' textAlign={'center'} mt={3}>
                    {item.name}
                  </Typography>
                  <Button onClick={() => handleDepartmentselection(item._id)} sx={{ mt: 2 }}>
                    Consult now
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Grid container justifyContent="center">
            <Button onClick={prevPage} disabled={currentPage === 0}>
              <ArrowBackIosIcon />Prev
            </Button>
            <Button onClick={nextPage} disabled={endIndex >= dept.length}>
              Next<ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TopSpeciality;
