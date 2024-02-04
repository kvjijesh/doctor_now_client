import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { images } from '../../images/image';

export default function CardComponent(props) {

  return (
    <Card sx={{ maxWidth: 280, marginTop:10 ,marginBottom:10,borderRadius:5,boxShadow:5 ,transition: 'transform 0.3s',
    '&:hover': {
        transform: 'translateY(-10px)',backgroundColor:'inherit'}}}>
      <CardActionArea sx={{":hover":{background:'white'}}}>
        <CardMedia
          component="img"
          height="300"
          image={props.imageUrl}
          alt="green iguana"
          sx={{objectFit:'fill'}}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          Click Here
        </Button>
      </CardActions>
    </Card>
  );
}
