import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@primer/css/index.scss';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
