import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table, message,Modal, Form,Input, Select, Button} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import './Students.css';
import AppLayout from '../layout/Layout';
import Page404 from '../Page404/Page404';


function Students() {
    const [student , setStudent]= useState([]);
    const [popUpModel , setPopUpModel]= useState(false)
    const getStudents = async()=>{
        const response = await axios.get('/students/getStudents')
        setStudent(response.data)
    }
    const handlerSubmit = async(val)=>{
        const {data} = await axios.post('/students/searchStudent',{email:val.email})
        if(data!=='Doesnot exist'){
            message.error("User Already Exist")
        }
        else{
            await axios.post('/students/addStudents',val)
            message.success("Student Added Successfully!")
            setPopUpModel(false)
            getStudents()
        }
    }
    const columns = [
        {
            title:"ID",
            dataIndex: "_id"
        },
        {
            title:"Name",
            dataIndex: "stdName"
        },
        {
            title:"Email",
            dataIndex: "email"
        },
        {
            title:"Tell",
            dataIndex: "phone"
        },
        {
            title:"Address",
            dataIndex: "residence"
        },
        {
            title:"Level",
            dataIndex: "edu_Level"
        },
        {
            title:"Gender",
            dataIndex: "gender"
        },
    ]
    useEffect(()=>{
        getStudents()
    },[])
    console.log(popUpModel)
  return (
    <div>

    {localStorage.getItem('data') === '"Exist"'? <AppLayout>
        <div className='container'>
      <button className='addstd' onClick={()=>setPopUpModel(true)}>Add New </button>
      <Table dataSource={student} columns={columns} bordered/>
      {
        popUpModel &&
        <Modal title="Add New Student" open={popUpModel} onCancel={()=>setPopUpModel(false)} footer={false}>
            <Form onFinish={handlerSubmit}>
                <FormItem label="Name" name="stdName">
                    <Input/>
                </FormItem>
                <FormItem label="email" name="email">
                    <Input/>
                </FormItem>
                <FormItem label="Tell" name="phone">
                    <Input/>
                </FormItem>
                <FormItem label="Address" name="residence">
                    <Input/>
                </FormItem>
                <FormItem label="Level" name="edu_Level">
                    <Input/>
                </FormItem>
                <FormItem label="Gender" name="gender">
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </FormItem>
                <FormItem label="User Name" name="userName">
                    <Input/>
                </FormItem>
                <FormItem label="Password" name="password">
                    <Input/>
                </FormItem>
                <div>
                    <Button htmlType='submit' className='savestd'>Save</Button>
                </div>
            </Form>
        </Modal>
      }
    </div>
    </AppLayout>:<Page404 text='only admins allowed this page' btn = '/studentsExam'/>}
    </div>
  )
}

export default Students
