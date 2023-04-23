import {Box, FormControl ,FormLabel , FormControlLabel ,RadioGroup,Radio} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './StudentExam.css';
import StudentReport from '../reports/StudentReport';
import Page404 from '../Page404/Page404';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

function StudentExam() {
    const [value , setValue]= useState('')
    const [exam, setExam] = useState([])
    const [index , setIndex]= useState(0);
    const [correct , setCorrect]= useState([])
    const [incorrect , setIncorrect]= useState([])
    const [report , setReport]= useState('')
    const navigate = useNavigate()
    const getExam = async()=>{
      const {data} = await axios.get("/exam/getQuestions")
      setExam(data)
    }
    const handlerChange =(event)=>{
      setValue(event.target.value)
    }
    const handleSubmit = ()=>{
      if(exam[index-1]!==undefined){
        if(exam[index-1].correct===value){
          setCorrect(val=> ([...val,'Correact'])) 
          addElement()
        }
        else{
          setIncorrect(val =>([...val,'Incorrect']))
          addElement()
        }
      }
    }
    const getResult = async()=>{
      const user = localStorage.getItem("data");
      const email = JSON.parse(user).email
      const {data} = await axios.post('/students/searchStudent',{email:email})
      const res = await axios.post('/report/addResult',{"stdName" : data.stdName,
      "phone" : data.phone,
      "email" : data.email,
      "resident": data.residence,
      "edu_Level" : data.edu_Level,
      "totalQuestions": correct.length + incorrect.length,
      "totalIncorrect": incorrect,
      "totalCorrect": correct,
      "percentage" : (((correct.length)/(correct.length + incorrect.length)*100).toFixed(2))})
      message.success('Successfully submited!')
      window.location.reload(true)
      
    }
    const getData = async()=>{
      const user = localStorage.getItem("data");
      const email = JSON.parse(user).email
      const d = await axios.post('/report/getReport',{email:email})
      if(d.data==='Doesnot Exist'){
        setReport('Doesnot Exist')
      }
      else{
        setReport('Exist')
      }
    }
    console.log(localStorage.getItem("data"))
    useEffect(()=>{
      getExam()
      getData()
    }, [])
  

  // add
  const getAudio = async (name) => {
    await fetch('http://localhost:2000/readAudio/'+name)
      .then(response => response.blob())
      .then(blob => {
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
    
      })
      .catch(error => console.log(error));
  }
  function addElement(exam) {
    setIndex(index + 1);
  }
  function getElements (arr, index) {
    if(localStorage.getItem("data")==='"Exist"'){
      return <h1>only Students allowed this page</h1>
    }
    else{
      if(report==='Exist'){
        return <StudentReport/>
      }
      else{
        if(index>exam.length){
          return <div>
            <button className='Start' onClick={getResult}>Submit Quiz</button>
          </div>
        }
        else{
          return arr.slice(index-1, index).map(el => {
            return <div>
              <Box className= 'box'>
                <FormControl>
                  {/* add */}
                  {el.type === 'audio' ? 
                    <button onClick={() => getAudio(el.question)}>Play Audio
                    </button>
                   :
                    <FormLabel id='question' className='question'>
                    {el.question}
                  </FormLabel>}
                  <RadioGroup name='questions' aria-labelledby='question' value={value} onChange={handlerChange}>
                    <FormControlLabel control={<Radio/>} label={el.option1} value={el.option1}/>
                    <FormControlLabel control={<Radio/>} label={el.option2} value={el.option2}/>
                    <FormControlLabel control={<Radio/>} label={el.option3} value={el.option3}/>
                    <FormControlLabel control={<Radio/>} label={el.option4} value={el.option4}/>
                    <button onClick={handleSubmit}>Submit</button>
                  </RadioGroup>
                </FormControl>
              </Box>
            </div>;
          });
        }
      }
    }

  }
    
  return (
    <div>
    {localStorage.getItem('data')!=='"Exist"'? <div>
      {report!=='Exist' &&
      <div>
      {index===0 &&<button onClick={addElement} className='Start'>Start quiz </button>}
      </div>}
      {getElements(exam, index)}
    </div>:<Page404 text ="only Students allowed this page" btn = '/'/>}
    </div>
  )
}

export default StudentExam


