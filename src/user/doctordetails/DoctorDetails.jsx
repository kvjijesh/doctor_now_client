import React from "react";
import Header from "../../components/header/Header";
import "./doctordetails.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";

const DoctorDetails = () => {
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const navigate = useNavigate();

  const handleBook = async (slot) => {
    navigate("/book-appointment", {
      state: { doctorData: doctorData, slot: slot },
    });
  };

  return (
    <>
      <Header />
      <Box>
        <Grid container display={'flex'} flexDirection={'column'}>
          <Grid>
            <Typography textAlign={'center'} mt={3} variant="h4">
              BOOK SLOTS HERE
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
            <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 328, height: 328, m: 3, boxShadow: 5 }} elevation={3} variant="outlined" >
              <Grid m={2} >
                {doctorData?.image ? (<img style={{ width: "10rem", height: "10rem", borderRadius: "100%" }} src={`http://localhost:8000/images/${doctorData?.image}`} alt="Profile" />) : (<img style={{ width: "10rem", height: "10rem", borderRadius: "100%" }}src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                  alt="Profile" />)}
              </Grid>
              <Grid>
                <Typography variant="button" display="block" fontSize={14} gutterBottom>
                  Dr.{doctorData.name}
                </Typography>
                <Typography variant="button" display="block" fontSize={12} gutterBottom>
                  {doctorData.specialisation}
                </Typography>
                <Typography variant="button"display="block" fontSize={12} gutterBottom>
                  {doctorData.qualification}
                </Typography>
                <Typography variant="button" display="block" fontSize={12} gutterBottom>
                  Rs.{doctorData.videoChatFee} fee
                </Typography>
              </Grid>
            </Paper>
            <Paper variant="outlined" sx={{ width: "70%", height: 328, m: 3, boxShadow: 5 }}>
              <Grid>
                <Typography variant="h5" mt={2} ml={2}>Available slots</Typography>
                <Divider sx={{width:"95%",mx:2}}/>
              </Grid>
              <Grid p={5}>
                {doctorData?.availableSlots.length === 0 ? (
                  <Typography variant="h4" mt={2}>No slots Available</Typography>
                ) : (
                  doctorData?.availableSlots.map((slot) => (
                    <Button onClick={() => handleBook(slot)} sx={{ m: 1, color: 'black', outline: "black", p: 1.5, fontSize: 11 }} variant="outlined" key={slot}>
                      {slot}
                    </Button>
                  ))
                )}
              </Grid>
            </Paper>

          </Grid>

        </Grid>
      </Box>

    </>
  );
};

export default DoctorDetails;
