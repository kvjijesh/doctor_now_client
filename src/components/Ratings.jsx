import React, { useState } from 'react'
import Header from './header/Header'
import Footer from './Footer'
import { Box, Button, Grid, Paper, Rating, TextField, Typography } from '@mui/material'
import axios from '../Servies/axiosInterceptor'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Ratings = () => {
    const [value, setValue] = useState(null)
    const [review,setReview]=useState('');
    const navigate=useNavigate()
    const data = useSelector(state => state.appointment?.appointment)
    const userId=data?.userId?._id;
    const doctorId=data?.doctorId?._id;
    const handleSubmit=async()=>{
        await axios.post('/ratings',{userId,doctorId,value,review})
        .then((res)=>{
            toast.success(`Feedback submitted`,{position:toast.POSITION.TOP_CENTER})
            navigate('/available-doctors')})
    }

    return (
        <>
            <Header />
            <Box>
                <Grid container display={'flex'} flexDirection={'column'}>
                    <Grid display={'flex'} justifyContent={'center'}>
                        <Grid>
                            <Typography variant='h3' mt={2}>Your Review & Ratings</Typography>
                        </Grid>
                    </Grid>
                    <Grid display={'flex'}  justifyContent={'center'}>
                        <Paper variant='outlined' sx={{ display: 'flex', flexDirection:"column" , width: 300, height: 300, mt: 10, mb: 10, boxShadow: 5 }}>
                            <Typography variant='h5' sx={{ m: 2,textAlign:"center" }}>Rating</Typography>
                            <Rating
                                sx={{display:'flex',justifyContent:'center'}}
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                            <Typography variant='h5' sx={{ m: 2,textAlign:"center" }}>Write a feedback</Typography>
                            <Grid display={'flex'} justifyContent={'center'}>
                            <TextField onChange={(e)=>setReview(e.target.value)} type='standard' multiline maxRows={4} sx={{width:'80%'}}/>
                            </Grid>
                            <Grid display={'flex'} justifyContent={'center'} mt={5}>
                                <Button onClick={handleSubmit} variant='contained' color='error'>submit</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
            <Footer />
        </>
    )
}

export default Ratings