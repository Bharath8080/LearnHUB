import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/common/Login';
import Register from './components/common/Register';
import Home from './components/common/Home';
import TeacherHome from './components/user/teacher/TeacherHome';
import StudentHome from './components/user/student/StudentHome';
import AdminHome from './components/admin/AdminHome';
import NavBar from './components/common/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <div className="bg-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/teacher" element={<TeacherHome />} />
            <Route path="/student" element={<StudentHome />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
