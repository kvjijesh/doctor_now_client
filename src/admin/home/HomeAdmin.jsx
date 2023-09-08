import React, { useEffect, useState } from "react";
import "./home.scss";
import DashBoardCard from "../../components/DashBoardCard";
import axios from "../../Servies/axiosInterceptor";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BarChart from "../../components/BarChart";
import { toast } from "react-toastify";

const HomeAdmin = () => {
  const [userCount, setuserCount] = useState(null)
  const [docCount, setdocCount] = useState(null)
  const [revenue, setRevenue] = useState(null)
  const [appoint,setAppoint]=useState([])
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get('/admin/user-count');
        setuserCount(res.data)

      } catch (error) {

      }
    }

    fetchUserCount()
  }, [])
  useEffect(() => {
    const fetchDoctorCount = async () => {
      await axios.get('/admin/doctor-count').then((res) => { setdocCount(res.data) }).catch((error)=>toast.error(`something went wrong`,{position:toast.POSITION.TOP_CENTER}));
    }
    fetchDoctorCount()
  }, [])

  useEffect(() => {
    const totalRevenue = async () => {
      await axios.get('/admin/total-revenue').then((res) => { setRevenue(res.data.totalAmountPaid) }).catch((error)=>toast.error(`something went wrong`,{position:toast.POSITION.TOP_CENTER}))
    }
    totalRevenue()
  }, [])
  useEffect(() => {
    const totalAppointments = async () => {
      await axios.get('/admin/all-bookings').then((res) => { setAppoint(res.data)}).catch((error)=>toast.error(`something went wrong`,{position:toast.POSITION.TOP_CENTER}))
    }
    totalAppointments()
  }, [])
  const title = 'Total Users'
  return (

    <>
      <Box >
        <Grid container display={"flex"} flexDirection={'column'}>
          <Grid>
            <Typography variant="h3" textAlign={'center'} mt={5}>
              Your Dashboard
            </Typography>
          </Grid>
          <Grid display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
            <DashBoardCard title={title} count={userCount} />
            <DashBoardCard title={'Total Doctors'} count={docCount} />
            <DashBoardCard title={"Total Revenuue"} count={revenue} />
          </Grid>
          <Grid display={'flex'} justifyContent={'center'}>
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
              <BarChart appoints={appoint} />
            </Paper>

          </Grid>

        </Grid>
      </Box>
    </>

  );
};

export default HomeAdmin;
