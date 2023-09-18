import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import AddDetail from "../profile/AddDetail";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";
import BarChart from "../../components/BarChart";

const DoctorHome = () => {
  const userType = "doctor";
  const doctorData = useSelector((state) => state.doctor.doctor);
  const [appointCount, setAppointCount] = useState(0);
  const [appoint, setAppoint] = useState([]);

useEffect(() => {
  const fetchCount = async () => {
    await axios.get(`/doctor/total-appointments/${doctorData?._id}`).then((res) => { setAppointCount(res.data) }).catch();
  }
  fetchCount()
}, [])
useEffect(() => {
  const fetchAppoint = async () => {
    await axios.get(`/doctor/appointment-list/${doctorData._id}`).then((res) => { setAppoint(res.data)  }).catch();
  }
  fetchAppoint()
}, [])

  return (
    <>
      {!doctorData?.is_submitted ? (
        <AddDetail />
      ) : (
        <>
          <Header userType={userType} />
          <Box>
            <Grid container display={'flex'} flexDirection={'column'}>
              <Grid>
                <Typography variant="h3" textAlign={'center'} mt={5}>Your Dashboard</Typography>
              </Grid>
              <Grid display={'flex'} justifyContent={'space-around'}>
                <Grid>
                  <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width: 250, height: 200, boxShadow: 5, ml: 5, mt: 5 }}>
                    <Typography variant="h4" textAlign={'center'} >Amount Recieved</Typography>
                    <Typography variant="h4" textAlign={'center'} mt={2}>{doctorData?.payments}</Typography>
                  </Paper>
                </Grid>
                <Grid>
                <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width: 250, height: 200, boxShadow: 5, ml: 5, mt: 5 }}>
                    <Typography variant="h4" textAlign={'center'} >Total Appointments</Typography>
                    <Typography variant="h4" textAlign={'center'} mt={2}>{appointCount}</Typography>
                  </Paper>
                </Grid>
                <Grid>
                  <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
                    <BarChart appoints={appoint}/>
                  </Paper>
                </Grid>

              </Grid>

            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default DoctorHome;
