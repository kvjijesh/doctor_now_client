import React from "react";
import CardComponent from "../card/CardComponent";
import { Container, Grid } from "@mui/material";
import { images } from "../../images/image";
import { Link } from "react-router-dom";

function Info() {
  const imageUrl1 = images.find_doctors;
  const imageUrl2 = images.video_consult;
  const imageUrl3 = images.chat;
  const title1 = "Find doctors near you";
  const title2 = "Instant video chat";
  const title3 = "Chat with your doctor";
  const desc1 = "Book appointments with doctors near you online";
  const desc2 = "consult through video with doctors available online";
  const desc3 = "Chat with your doctor who is available online";
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4} md={2.4}>
          <Link to="/available-doctors">
            <CardComponent imageUrl={imageUrl1} title={title1} desc={desc1} />
          </Link>
        </Grid>
        <Grid item xs={12} lg={4} md={2.4}>
          <CardComponent imageUrl={imageUrl2} title={title2} desc={desc2} />
        </Grid>
        <Grid item xs={12} lg={4} md={2.4}>
          <CardComponent imageUrl={imageUrl3} title={title3} desc={desc3} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Info;
