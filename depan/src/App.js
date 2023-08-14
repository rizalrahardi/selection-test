
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Navbar from './components/Navbar';
import CreateEmployee from './pages/CreateEmployee';
import UpdateProfile from './pages/UpdateProfile';
import AttendanceLog from './pages/AttendanceLogUser';
import MonthlySalaryReport from './pages/SalaryReportUser';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/admin/create-employee' element={<CreateEmployee />} />
        <Route path='/profile/:token' element={<UpdateProfile />} />
        <Route path='/attendance-log' element={<AttendanceLog />} />
        <Route path='/salary-report' element={<MonthlySalaryReport />} />
      </Routes>
    </div>
  );
}

export default App;
