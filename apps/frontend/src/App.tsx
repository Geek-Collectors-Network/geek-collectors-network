import React from 'react';
import { Routes, Route, Form } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
// import LoginForm from './components/LoginForm';
import GeneralForm from './components/GeneralForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Registration formComponent={<GeneralForm formType="registration" />} />} />
      <Route path="/login" element={<LoginPage formComponent={<GeneralForm formType="login" />} />} />

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
