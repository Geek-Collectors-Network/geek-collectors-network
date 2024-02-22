import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
// import LoginForm from './components/LoginForm';
import RegistrationForm2 from './components/RegistrationForm2';
import LoginForm2 from './components/LoginForm2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration formComponent={<RegistrationForm2 />} />} />
      <Route path="/login" element={<LoginPage formComponent={<LoginForm2 />} />} />

      {/* Profile page and profile edit page */}
      {/* <Route path="/profile" /> */}
      {/* <Route index element={<ProfilePage />} /> */}
      {/* <Route path="/edit" element={<ProfileEditPage />}  /> */}

      {/* 404 */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App;
