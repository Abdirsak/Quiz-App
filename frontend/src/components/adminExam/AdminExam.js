import React ,{useEffect, useRef, useState} from 'react';
import {Modal, Table , message ,Button,Input,Form } from 'antd';
import FormItem from "antd/es/form/FormItem";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import './adminExam.css'
import AppLayout from '../layout/Layout';

function AdminExam() {
  const fileInputRef = useRef(null);
  const [exam, setExam] = useState([]);
  const [form] = Form.useForm();
    const [editPopUpModal , setEditPopModal]= useState(false);
    const [editExam , setEdiExam]= useState({})
    const[addPopModal , setAddPopModal] = useState(false)
    const [questionType , setQuestionType]= useState('audio')
    const column =[
      {
        title:"ID",
        dataIndex:"_id"
      },
      {
        title:"Question",
        dataIndex:"question"
      },
      {
        title:"Option 1",
        dataIndex:"option1"
      },
      {
        title:"Option 2",
        dataIndex:"option2"
      },
      {
        title:"Option 3",
        dataIndex:"option3"
      },
      {
        title:"Option 4",
        dataIndex:"option4"
      },
      {
        title:"Correct One",
        dataIndex:"correct"
      },
      {
        title : "Action",
        dataIndex : "_id",
        render:(id , record)=> 
        <div>
            <DeleteOutlined className='cart-action' onClick={()=>handlerDelete(record)}/>
            <EditOutlined className="cart-edit" onClick={()=> {setEdiExam(record);setEditPopModal(true)}}/>
        </div>
    }
    ]
    const handlerSubmit = async (value)=>{
      await axios.post('/exam/updateQuestions',{question_Id:editExam._id , ...value})
      message.success('Question Updated Successfully!')
      setEditPopModal(false);
      getExam();
    }
  const handlerAdd = async (value) => {
    const formData = new FormData();
    const { correc, option_1, option_2, option_3, option_4, questio } = value
    
    if (questionType === 'audio') { 
      const selectedFiles = fileInputRef.current.files;
      const file = selectedFiles[0] ?? null;
      formData.append('file', file);
      formData.append('question', file.name);
    } else {
      formData.append('question', questio);
    }

    formData.append("type", questionType);
    formData.append("option1", option_1);
    formData.append("option2", option_2);
    formData.append("option3", option_3);
    formData.append("option4", option_4);
    formData.append("correct", correc);


    // console.log(formData.getAll("question"));
    // return
    
    await axios.post('/exam/addQuestions', formData)
      message.success("Question Added Successfully")
    setAddPopModal(false)
    getExam();
    
    }
    const getExam = async ()=>{
        const {data} = await axios.get('/exam/getQuestions')
        setExam(data)
    }
    const handlerDelete = async(record)=>{
        await axios.post("/exam/deleteQuestions", {question_Id : record._id});
        message.success("Question Deleted Successfully!")
        getExam();
    }
    const handleChange=(e)=>{
      setQuestionType(e.target.value);
    }
    useEffect(()=>{
        getExam()
    },[])
  return (
    <AppLayout>
       <div>
      <Button className="add-new" onClick={()=> setAddPopModal(true)}>Add New</Button>
      <Table dataSource={exam} columns={column} bordered/>
      {
            editPopUpModal && 
            <Modal title={"Edit Question" } open={editPopUpModal} onCancel={()=>{setEditPopModal(false)}} footer={false}>
            <Form layout="vertical" initialValues={editExam} onFinish={handlerSubmit} >
                <FormItem name="question" label = "Question">
                    <Input/>
                </FormItem>
                <FormItem name="option1" label = "Option1">
                    <Input />
                </FormItem>
                <FormItem name="option2" label = "Option 2">
                    <Input/>
                </FormItem>
                <FormItem name="option3" label = "Option 3">
                    <Input/>
                </FormItem>
                <FormItem name="option4" label = "Option 4">
                    <Input/>
                </FormItem>
                <FormItem name="correct" label = "Correct One">
                    <Input/>
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">save</Button>
                </div>
            </Form>
        </Modal>
        }
        {
            addPopModal && 
            <Modal title={"Add Quetion" } open={addPopModal} onCancel={()=>{setAddPopModal(false)}} footer={false}>
            <Form form={form} layout="vertical" initialValues={editExam} onFinish={handlerAdd} >
                  <label for="pet-select">Choose a question Type:</label><br/>
                  <select className='audio' onChange={handleChange}>
                      <option value="audio">Audio</option>
                      <option value="text">Text</option>
                  </select>
                <FormItem name="questio" label = "Question">
                    {
                      questionType ==='audio'? 
                      <input type="file"
                        accept=".mp3,audio/*" 
                         ref={fileInputRef}
                        />:
                      <Input/>
                    }
                </FormItem>
                <FormItem name="option_1" label = "Option1">
                    <Input />
                </FormItem>
                <FormItem name="option_2" label = "Option 2">
                    <Input/>
                </FormItem>
                <FormItem name="option_3" label = "Option 3">
                    <Input/>
                </FormItem>
                <FormItem name="option_4" label = "Option 4">
                    <Input/>
                </FormItem>
                <FormItem name="correc" label = "Correct One">
                    <Input/>
                </FormItem>
                <div className="form-btn-add">
                    <Button htmlType="submit" className="add-new">Add</Button>
                </div>
            </Form>
        </Modal>
        }
    </div>
    </AppLayout>
  )
}

export default AdminExam
