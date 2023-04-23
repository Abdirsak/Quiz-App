import './App.css';
import {BrowserRouter as Router, Routes , Route, Navigate} from 'react-router-dom';
import Login from './components/login/Login';
import Students from './components/students/Students';
import Exam from './components/adminExam/AdminExam.js'
import StudentExam from './components/studentExam/StudentExam';
import StudentReport from './components/reports/StudentReport';


function App() {

  return (
    <div>
      <>
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRouter>
            <Students/>
            </ProtectedRouter>
            }/>
          <Route path='/exam' element={
            <ProtectedRouter>
              <Exam/>
          </ProtectedRouter>
          }/>
          <Route path='/studentsExam' element={
            <ProtectedRouter>
              <StudentExam/>
             </ProtectedRouter>
          }/>
          <Route path='/report' element={
            <ProtectedRouter>
              <StudentReport/>
            </ProtectedRouter>
          }/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Login/>}/>
        </Routes>
      </Router>
    </>
    </div>
  );
}

export default App;

export function ProtectedRouter ({children}){
  if(localStorage.getItem("data")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}