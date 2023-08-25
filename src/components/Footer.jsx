import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#87f1f5" }}>
        <Box sx={{ display: "flex", justifyContent: "space-around",flexWrap: 'wrap', p: 2 }}>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 2 }}>
            <Typography
              sx={{ color: "#FD810F", fontSize: { xs: 25, sm: 35 }, fontWeight: 500, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Doctor Now
            </Typography>
            <Typography
              sx={{ color: "#0D369F", fontSize: 12, fontWeight: 500, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Doctor on your fingertip
            </Typography>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 3 }}>
            <Typography
              sx={{ color: "#0D369F", fontSize: { xs: 18, sm: 25 }, fontWeight: 600, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Quick Links
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem>
                <ListItemText primary="Doctors" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Bookings" />
              </ListItem>
              <ListItem>
                <ListItemText primary="About us" />
              </ListItem>

            </List>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "300px", mb: 3 }}>
            <Typography
              sx={{ color: "#0D369F", fontSize: { xs: 18, sm: 25 }, fontWeight: 600, mt: 3, textAlign: { xs: 'center', sm: 'left' } }}
            >
              Our Services
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem >
                <ListItemText sx={{fontSize:'15px'}} primary="Primary Care" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Mental Care" />
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
