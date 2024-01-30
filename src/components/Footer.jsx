import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Box sx={{ backgroundColor:'#4c92ed',  }}>
        <Box sx={{ display: "flex", justifyContent: "space-around",flexWrap: 'wrap', p: 2, mx:'auto',maxWidth:'120rem' }}>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 2 }}>
            <Typography
              sx={{ color: "white", fontSize: { xs: 25, sm: 35 }, fontWeight: 500, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Doctor Now
            </Typography>
            <Typography
              sx={{ color: "white", fontSize: 12, fontWeight: 500, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Doctor on your fingertip
            </Typography>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 3 }}>
            <Typography
              sx={{ color: "white", fontSize: { xs: 18, sm: 25 }, fontWeight: 600, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Quick Links
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem>
                <Link to={'/all-doctors'}>
                <ListItemText sx={{color:'black'}}>Doctors</ListItemText>
                </Link>
              </ListItem>
              <ListItem>
                <Link  to={'/user-bookings'}>
                <ListItemText sx={{color:'black'}}>Bookings</ListItemText>
                </Link>
              </ListItem>

            </List>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 3 }}>
            <Typography
              sx={{ color: "white", fontSize: { xs: 18, sm: 25 }, fontWeight: 600, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Our Services
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem >
                <ListItemText  primary="Primary Care" />
              </ListItem>
              <ListItem >
                <ListItemText  primary="Mental Care"  />
              </ListItem>
              <ListItem>
                <ListItemText primary="Lifestyle Care" />
              </ListItem>

            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
