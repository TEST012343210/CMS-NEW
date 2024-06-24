import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ContentList from './components/Content/ContentList';
import ContentForm from './components/Content/ContentForm';
import Home from './components/Home';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Users from './components/Dashboard/Users';
import ManageContent from './components/Dashboard/ManageContent';
import ManageSchedules from './components/Dashboard/ManageSchedules';
import Dashboard from './components/Dashboard/Dashboard';
import AllDevices from './components/Devices/AllDevices';
import UnapprovedDevices from './components/Dashboard/UnapprovedDevices';
import DeviceRegistration from './components/DeviceRegistration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/content" element={<ContentList token={token} />} />
            <Route path="/create-content" element={<ContentForm token={token} />} />
            <Route path="/register-device" element={<DeviceRegistration />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="all-devices" element={<AllDevices />} />
              <Route path="unapproved-devices" element={<UnapprovedDevices />} />
              {role === 'Admin' && <Route path="users" element={<Users />} />}
              <Route path="content" element={<ManageContent token={token} />} />
              <Route path="create-content" element={<ContentForm token={token} />} />
              <Route path="schedules" element={<ManageSchedules />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
