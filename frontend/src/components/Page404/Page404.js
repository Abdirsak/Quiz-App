import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Page404.css'
import {useNavigate} from 'react-router-dom'


export default function Page404(probs) {
    const navigate = useNavigate()
    const handleClick = ()=>{
        const nav = probs.btn
        navigate(nav)
    }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent className='center'>
        <Typography variant="h5" component="div" >
          {probs.text}
        </Typography>
      </CardContent>
      <CardActions className='center'>
        <Button size="small" onClick={handleClick}>Go Back</Button>
      </CardActions>
    </Card>
  );
}

