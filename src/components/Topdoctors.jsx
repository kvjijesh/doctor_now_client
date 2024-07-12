import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import axios from '../Servies/axiosInterceptor'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Topdoctors = () => {
    const [doctors, setdoctors] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`/top-doctors`)
            .then((response) => {
                setdoctors(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleBook = async (doctorData) => {
        navigate('/doctor-details', { state: { doctorData: doctorData } })
    }

    return (
        <>
            <Box container flexDirection={'column'} mb={10} mx={'auto'} maxWidth={'120rem'}>
                <Grid display={'flex'} justifyContent={'center'} mt={2}>
                    <Typography variant='h4'>Our Doctors</Typography>
                </Grid >
                <Grid display={'flex'} justifyContent={'space-around'} flexWrap={'wrap'} mt={2} mb={2}>
                    {doctors?.map((item, i) => {
                        return (
                            <Paper key={i} display={'flex'} flexDirection={'column'} sx={{
                                width: 250, m: 3, boxShadow: 10, borderRadius: 4, transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-30px)'
                                }
                            }}>
                                <Grid display={'flex'} justifyContent={'center'} mt={2}>
                                    {item?.image ? (<img style={{ width: 100, height: 100, borderRadius: '50%' }} src={`https://doctor-now-server-1.onrender.com/images/${item?.image}`} alt="" />) : (<img style={{ width: 100, height: 100, borderRadius: '50%' }} src={`https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg`} alt="" />)}
                                </Grid>
                                <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='h4' textAlign={'center'} mt={3}>
                                        Dr.{item?.name}
                                    </Typography>
                                    <Typography variant='button' fontSize={14} textAlign={'center'} mt={3}>
                                        {item.specialisation?.name}
                                    </Typography>
                                    <Typography variant='button' fontSize={16} textAlign={'center'} mt={3}>
                                        {item.qualification}
                                    </Typography>
                                    <Button onClick={() => handleBook(item)} sx={{ width: '50%', mt: 5, mb: 5 }} variant='contained' color='primary' >book now</Button>
                                </Grid>
                            </Paper>
                        )
                    })}
                </Grid>
                <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Button onClick={() => { navigate("/all-doctors") }} variant='outlined' sx={{ width: 220, mt: 3 }}>View all doctors</Button>
                </Grid>

            </Box>

        </>
    )
}

export default Topdoctors