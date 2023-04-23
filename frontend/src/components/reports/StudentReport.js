import React, { useEffect, useState } from 'react'
import { Box,Card,CardContent,Typography } from '@mui/material';
import './StudentReport.css';
import logo from '../../Logo/Bravo.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentReport() {
  const [report , setReport] = useState('')
  const [data , setData] = useState({})
  const navigate = useNavigate()
  const getData = async()=>{
    const user = localStorage.getItem("data");
    const email = JSON.parse(user).email
    const d = await axios.post('/report/getReport',{email:email})
    if(d.data==='Doesnot Exist'){
      setReport('Doesnot Exist')
      setData({})
    }
    else{
      setReport('Exist')
      setData(d.data)
      
    }
  }
  console.log(data)
    useEffect(()=>{
        getData();
    },[])
  return (
    <div className='reportContainer'>
    <button className='logout' onClick={()=>{
      localStorage.removeItem('data')
      navigate('/login')
    }}>Logout</button>
        {
          report === 'Exist' ? <div><h2 className='repotHeader'>Personal Report</h2>
        <center><img src={logo} alt='logo' className='logo'/></center>
        <center>
        <Box width='600px'>
          <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>Student Info</Typography>
                <Typography variant='body2' color='text.secondary' className='left'>Name: {data.stdName}</Typography>
                <Typography variant='body2' color='text.secondary' className='right'>Email: {data.email} </Typography>
                <Typography variant='body2' color='text.secondary' className='left'>Phone : {data.phone}</Typography>
                <Typography variant='body2' color='text.secondary' className='right'>Residence: {data.resident}</Typography>
                <Typography variant='body2' color='text.secondary' className='left'>Education Level: {data.edu_Level}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box width='600px' className='second'>
          <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>Quiz Information</Typography>
                <Typography variant='body2' color='text.secondary' className='left'>Total Questions: {data.totalQuestions
}</Typography>
                <Typography variant='body2' color='text.secondary' className='right'>Total Incorrect: {data.totalIncorrect.length}</Typography>
                <Typography variant='body2' color='text.secondary' className='left'>Total Correct: {data.totalCorrect.length}</Typography>
                <Typography variant='body2' color='text.secondary' className='right'>Percentage: {data.percentage}%</Typography>
            </CardContent>
          </Card>
        </Box>
        </center></div>:<h1>Doesnot get the data</h1>
        }
    </div>
  )
}

export default StudentReport
