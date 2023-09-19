import React from "react";
import BookingCard from "./BookingCard";
import "./booking.scss";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Servies/axiosInterceptor";
import { Box, Button, Divider, Grid, InputAdornment, Paper, Radio, TextField, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';

const Booking = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const slot = location.state?.slot;
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user);
  const Patient = "Patient Details";
  const Doctor = "Doctor Details";



  const handleAppointment = async () => {
    try {
      const res = await axios.post('/create-checkout-session', { doctorData, user, slot })
      if (res.data.url) {
        window.location.href = res.data.url
      }

    } catch (error) {
      navigate(-1)
    }

  }

  const handleback = () => {
    navigate(-1)
  }

  return (
    <>
      <Box sx={{backgroundColor:"#f7f7f7" }}>
        <Grid container display={'flex'} justifyContent={'center'} flexWrap={"wrap"} >
          <Grid >
            <Typography sx={{ m: 3 }} variant="h4"> Doctor Details </Typography>
            <Paper variant="outlined" sx={{ width: 450, height: 450, boxShadow: 2, m: 3 }}>
              <Grid display={'flex'} gap={1} >
                <HomeIcon fontSize="large" sx={{ borderRadius: "50%", color: "white", backgroundColor: "#199fd9", ml: 2, mt: 2 }} />
                <Typography variant="h4" ml={1} mt={1.5}>Appointment</Typography>
              </Grid>
              <Divider sx={{ mt: 1 }} />
              <Grid display={'flex'}>
                <CalendarMonthIcon sx={{ ml: 2.3, mt: 2 }} />
                <Typography variant="h5" mt={2} ml={2}>on {slot}</Typography>
              </Grid>
              <Divider sx={{ mt: 2 }} />
              <Grid display={'flex'} gap={5}>
                <Grid sx={{ width: 70, mt: 2, ml: 2 }}>
                  <img src={`https://mydoctornow.online/images/${doctorData?.image}`} alt="" />
                </Grid>
                <Grid display={'flex'} flexDirection={'column'} mt={2} >
                  <Typography variant="subtitle2" sx={{ fontSize: 15 }}>Dr.{doctorData.name} </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: 13 ,color:"GrayText"}}>{doctorData.qualification} </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: 13 ,color:"GrayText"}}>{doctorData.specialisation.name} </Typography>

                </Grid>
              </Grid>
              <Divider sx={{ mt: 1 }} />
              <Grid display={'flex'} gap={5}>
                <Grid sx={{ width: 70, mt: 2, ml: 2 }}>
                  <img src={`https://upload.wikimedia.org/wikipedia/commons/7/74/Location_icon_from_Noun_Project.png`} alt="" />
                </Grid>
                <Grid display={'flex'} flexDirection={'column'} mt={2} >
                  <Typography variant="subtitle2" sx={{ fontSize: 13 ,color:"GrayText"}}>{doctorData.street} </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: 13,color:"GrayText"}}>{doctorData.city} </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: 13 ,color:"GrayText"}}>{doctorData.state} </Typography>

                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid>
            <Typography sx={{ m: 3,ml:5 }} variant="h4"> Patient details </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", width: 500, m: 3}}>
              <Typography fontSize={16} sx={{ ml: 2, mt: 2,fontWeight:"bold" }}>This appointment is for</Typography>
              <Grid ml={2} mt={1} mr={10}>
              <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>)
                  }}
                  type="standard"
                  variant="outlined"
                  disabled
                  value={user.name}
                  fullWidth
                  sx={{backgroundColor:"white",}}
                />
              </Grid>
              <Grid>
                <Typography sx={{fontSize:15,ml:2,mt:2,fontWeight:"bold"}}>Check following details</Typography>
                <Typography sx={{fontSize:13,ml:2,}}>Email</Typography>
              </Grid>
              <Grid ml={2} mr={10}>
              <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>)
                  }}
                  type="standard"
                  variant="outlined"
                  disabled
                  value={user.email}
                  fullWidth
                  sx={{backgroundColor:"white",}}
                />
              </Grid>
              <Grid>
                <Typography sx={{fontSize:13,ml:2}}>Mobile</Typography>
              </Grid>
              <Grid ml={2} mr={10}>
              <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>)
                  }}
                  type="standard"
                  variant="outlined"
                  disabled
                  value={user.mobile}
                  fullWidth
                  sx={{backgroundColor:"white",}}
                />
              </Grid>
              <Grid>
                <Paper sx={{display:"flex", ml:2,mt:2,width:'81%',height:50}}>
                  <Radio sx={{m:1}} checked/>
                  <Typography sx={{mt:0.5,fontSize:15}}>Rs.{doctorData.videoChatFee}</Typography>
                  <Typography sx={{mt:0.7,ml:1,fontSize:13}}>Pay online</Typography>
                </Paper>
                <Grid sx={{mt:3,ml:2,mb:2}}>
                <Button onClick={handleAppointment} sx={{width:"84%"}} size="large" variant="contained" color="primary">confirm appointment</Button>
                </Grid>

              </Grid>
            </Box>
          </Grid>

        </Grid>
      </Box>


    </>
  );
};

export default Booking;
