import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./doctordetails.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Grid, Paper, Rating, Typography, useMediaQuery } from "@mui/material";
import axios from "../../Servies/axiosInterceptor";



const DoctorDetails = () => {
  const [ratings, setratings] = useState([])
  const [avgReview, setavgReview] = useState(0)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const location = useLocation();
  const doctorData = location.state?.doctorData;
  const navigate = useNavigate();
  const id = doctorData._id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-ratings/${id}`, {
          params: { page, limit },
        });
        setratings(response.data.allRatings);
        setavgReview(response.data.averageRating)


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const fetchMoreRatings = async () => {
    try {
      setPage(page + 1)
      const response = await axios.get(`/get-ratings/${id}`, {
        params: { page: page + 1, limit }
      });


      setratings((prevRatings) => [...prevRatings, ...response.data.allRatings]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeMore = () => {
    setPage(page + 1);
    fetchMoreRatings()
  };

  const handleBook = async (slot) => {
    navigate("/book-appointment", {
      state: { doctorData: doctorData, slot: slot },
    });
  };
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Header />
      <Box >
        <Grid container display={'flex'} flexDirection={'column'} mx={'auto'} maxWidth={'120rem'}>
          <Grid>
            <Typography textAlign={'center'} mt={3} variant="h4">
              BOOK SLOTS HERE
            </Typography>
          </Grid>
          <Grid display={'flex'} flexDirection={'row'} flexWrap={'wrap'} marginLeft={3}>
            <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: isMobile ? '100%' : 328, height: 328, m: 3, boxShadow: 4 }} variant="outlined" >
              <Grid m={2} >
                {doctorData?.image ? (<img style={{ width: "10rem", height: "10rem", borderRadius: "100%" }} src={`https://mydoctornow.online/images/${doctorData?.image}`} alt="Profile" />) : (<img style={{ width: "10rem", height: "10rem", borderRadius: "100%" }} src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                  alt="Profile" />)}
              </Grid>
              <Grid>
                <Typography variant="button" display="block" fontSize={14} gutterBottom>
                  Dr.{doctorData.name}
                </Typography>
                <Typography variant="button" display="block" fontSize={12} gutterBottom>
                  {doctorData?.specialisation?.name}
                </Typography>
                <Typography variant="button" display="block" fontSize={12} gutterBottom>
                  {doctorData.qualification}
                </Typography>
                <Typography variant="button" display="block" fontSize={12} gutterBottom>
                  Rs.{doctorData.videoChatFee} fee
                </Typography>
              </Grid>
            </Paper>
            <Paper variant="outlined" sx={{ width: isMobile ? '100%' : 850, height: 328, m: 3, boxShadow: 4, overflow: 'scroll', overflowX: "auto" }}>
              <Grid>
                <Typography variant="h5" mt={2} ml={2}>Available slots</Typography>
                <Divider sx={{ width: "95%", mx: 2 }} />
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
          <Grid display={'flex'} marginLeft={3} mb={2}>
            <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : 900, m: 3, boxShadow: 4, }}>
              <Typography variant="h4" ml={2} mt={2}>Ratings & Reviews</Typography>
              <Divider sx={{ mx: 2, mt: 1 }} />
              <Grid display={'flex'}>
              <Typography variant="h5" ml={2} mt={1.8}>{avgReview}</Typography>
              <Rating sx={{ml:1,mt:2}} name="half-rating-read" value={avgReview} precision={0.5} readOnly /></Grid>
              {ratings.length === 0 ? (<Grid><Typography variant="button" sx={{ ml: 2, mt: 2, fontSize: 20, }}>No Rating yet</Typography></Grid>) : (ratings && ratings.map((element) => {
                return (<Grid  key={element._id} marginTop={1} marginBottom={1.5}>
                  <Typography variant="button" sx={{ ml: 2, fontSize: 15, }}>{element.userId.name}</Typography>
                  <Typography variant="h5" sx={{ ml: 2, fontSize: 12 }}>{element.createdAt}</Typography>
                  <Typography variant="h5" sx={{ ml: 2, fontSize: 13, }}>"{element.feeedback}"</Typography>
                </Grid>)
              }))}
              {ratings.length !== 0 ?(<Grid textAlign={'center'} mb={3}><Button onClick={handleSeeMore} variant="contained" color="primary">see more</Button>
              </Grid>):(null)}


            </Paper>
          </Grid>

        </Grid>
      </Box>

    </>
  );
};

export default DoctorDetails;
