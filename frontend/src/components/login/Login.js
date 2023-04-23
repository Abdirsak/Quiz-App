import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Stack } from '@mui/material';
import {message} from 'antd';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const theme = createTheme();

export default function Login() {
  const [role , setRole] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(role ==='' || data.get('userName')=== '' || data.get('password')===''){
      message.error('must choose your role or fill Empty fields')
    }
    else{
      if(role === 'Admin'){
        const response = await axios.post('/admin/adminLogin',{userName:data.get('userName'),password:data.get('password')})
        if(response.data=== 'Exist'){
          console.log(response)
          localStorage.setItem("data", JSON.stringify(response.data))
          message.success('Login Successfully')
          navigate('/')
        }
        else{
          message.error('Login failed')
        }

      }
      else{
        const response = await axios.post('/students/studentLogin',{userName:data.get('userName'),password:data.get('password')})
        if(response.data!=='Doesnot exist'){
          localStorage.setItem("data", JSON.stringify(response.data))
          message.success('Login Successfully')
          navigate('/studentsExam')
        }
        else{
          message.error("Login failed")
        }
        console.log(response)  
      }
    }
  };
  const Role = ['Admin','Student'];
  useEffect(()=>{
    if(localStorage.getItem("data")){
      localStorage.getItem("data")
      navigate("/")}
  },[navigate])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> 
            <Stack spacing={2} width='240px'>
            <Autocomplete
              options={Role}
              sx={{ width: 395 }}
              renderInput={(params) => <TextField {...params} label="Role"
            />}
            value={role}
            onChange={(event,val)=>setRole(val)}
            />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}



