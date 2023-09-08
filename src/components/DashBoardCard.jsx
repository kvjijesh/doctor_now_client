import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function DashBoardCard({ title ,count}) {
  return (
    <Box sx={{ minWidth: 275, boxShadow:5, margin:5 }}>
      <Card variant="outlined" sx={{background:'#8eb8e6'}}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h2" component="div">
                {count}
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}
