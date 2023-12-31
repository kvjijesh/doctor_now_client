import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { images } from '../../images/image';

export default function CardComponent(props) {

  return (
    <Card sx={{ maxWidth: 280, marginLeft:10 , marginTop:10 ,marginBottom:10, borderRadius:5,boxShadow:5}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          ma
          image={props.imageUrl}
          alt="green iguana"
          sx={{m:1}}
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
          Click
        </Button>
      </CardActions>
    </Card>
  );
}
