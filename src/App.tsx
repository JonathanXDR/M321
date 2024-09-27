import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@primer/css/index.scss';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import { checkConnection } from './services/http.service';
import BlankStateConnectionError from './components/BlankState/BlankStateBackendError';
import SignUpPage from './pages/SignUpPage';
import PasswordResetPage from './pages/PasswordResetPage';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const checkApi = async () => {
      const connectionStatus = await checkConnection();
      console.log(connectionStatus);
      setIsConnected(connectionStatus);
    };

    checkApi();
  }, []);

  return (
    <>
      {isConnected === false ? (
        <BlankStateConnectionError />
      ) : (
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/password_reset" element={<PasswordResetPage />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;
